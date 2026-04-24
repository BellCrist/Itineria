import Cookies from 'js-cookie';
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userCookie = Cookies.get('user_session');
        if (userCookie) {
            setUser(JSON.parse(userCookie));
        }

        /**
         * Se l'access token è scaduto, chiamo il refresh.
         */
        const refreshAccessToken = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/auth/refresh', {
                    method: 'POST',
                    credentials: 'include'
                });
                return response.ok;
            } catch (error) {
                console.error('Errore refresh token:', error);
                return false;
            }
        };

        /**
         * Recupero le credenziali dell'utente loggato.
         * Se l'access token è scaduto, lo rigenero utilizzando il refresh token
         */
        const fetchCurrentUser = async () => {
            try {
                let response = await fetch('http://localhost:8080/api/auth/me', {
                    method: 'GET',
                    credentials: 'include'
                });

                if (response.status === 401 || response.status === 403) {
                    const refreshed = await refreshAccessToken();
                    if (refreshed) {
                        response = await fetch('http://localhost:8080/api/auth/me', {
                            method: 'GET',
                            credentials: 'include'
                        });
                    }
                }

                if (response.ok) {
                    const data = await response.json();
                    setUser(data.user);
                    Cookies.set('user_session', JSON.stringify(data.user), { expires: 1 });
                } else {
                    setUser(null);
                    Cookies.remove('user_session');
                }
            } catch (error) {
                console.error('Errore recupero utente corrente:', error);
                setUser(null);
                Cookies.remove('user_session');
            } finally {
                setLoading(false);
            }
        };

        fetchCurrentUser();
    }, []);

    //Salvataggio delle info utente nei cookies e nella variabile di stato
    const login = (userData) => {
        Cookies.set('user_session', JSON.stringify(userData.user), { expires: 1 });
        setUser(userData.user);
    };

    //Rimozione delle info utente da cookies e variabile di stato
    const logout = () => {
        Cookies.remove('user_session');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};