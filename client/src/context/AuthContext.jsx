import Cookies from 'js-cookie';
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userCookie = Cookies.get('user_session');
        if (userCookie) {
            setUser(JSON.parse(userCookie));
        }
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
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};