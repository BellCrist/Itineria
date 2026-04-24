import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import db from '../database/database_connection.js';


//Registrazione di un nuovo utente con salvataggio nel db delle rispettive informazioni:
const registerUser = async (req, res) => {
    const { name, surname, country, city, address, province, zipCode, email, password } = req.body;
    const sql = "INSERT INTO users (name, surname, country, city, address, province, zipCode, email, password) VALUES (?,?,?,?,?,?,?,?,?)";

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const [result] = await db.execute(
            sql,
            [name, surname, country, city, address, province, zipCode, email, hashedPassword]
        );

        if (result.insertId) {
            // Generate tokens
            const accessToken = jwt.sign(
                { id: result.insertId, email: email, name: name, surname: surname },
                process.env.JWT_SECRET,
                { expiresIn: '15m' } // Short-lived access token
            );

            const refreshToken = crypto.randomBytes(64).toString('hex');
            const refreshTokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');
            const refreshTokenExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

            // Store refresh token hash in database
            await db.execute(
                'INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?, ?)',
                [result.insertId, refreshTokenHash, refreshTokenExpiry]
            );

            const accessTokenOptions = {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Lax',
                maxAge: 15 * 60 * 1000 // 15 minutes
            };

            const refreshTokenOptions = {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Lax',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            };

            res.status(201)
                .cookie('accessToken', accessToken, accessTokenOptions)
                .cookie('refreshToken', refreshToken, refreshTokenOptions)
                .json({
                    message: "Registrazione effettuata con successo",
                    user: { name: name, email: email, id: result.insertId }
                });
        } else {
            return res.status(500).json({ message: "Errore nella registrazione" });
        }
    } catch (error) {
        console.error("Errore db: ", error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: "Email già registrata" });
        }
        res.status(500).json({ error: "Errore creazione utente" });
    }
}

//Check token ed eventuale rigenerazione
const refreshToken = async (req, res) => {
    const token = req.cookies.refreshToken;

    if (!token) {
        return res.status(401).json({ message: "Refresh token richiesto" });
    }

    try {
        const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

        // Check if refresh token exists and is valid
        const [rows] = await db.execute(
            `SELECT rt.*, u.name, u.surname, u.email
            FROM refresh_tokens rt
            JOIN users u ON rt.user_id = u.id
            WHERE rt.token = ?
            AND rt.expires_at > NOW()`,
            [tokenHash]
        );

        if (rows.length === 0) {
            return res.status(403).json({ message: "Refresh token non valido o scaduto" });
        }

        const user = rows[0];

        // Generate new access token
        const newAccessToken = jwt.sign(
            { id: user.user_id, email: user.email, name: user.name, surname: user.surname },
            process.env.JWT_SECRET,
            { expiresIn: '15m' }
        );

        const accessTokenOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax',
            maxAge: 15 * 60 * 1000 // 15 minutes
        };

        res.status(200)
            .cookie('accessToken', newAccessToken, accessTokenOptions)
            .json({
                message: "Token aggiornato"
            });
    } catch (error) {
        console.error("Errore durante il refresh del token:", error);
        res.status(500).json({ message: "Errore durante il refresh del token" });
    }
}

const getCurrentUser = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Utente non autenticato' });
    }

    res.status(200).json({ user: req.user });
};


//Procedura di login con convalida credenziali e generazione token
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        const user = rows[0];

        if (!user) {
            return res.status(401).json({ message: "Credenziali non valide" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Credenziali non valide" });
        }

        // Generate tokens
        const accessToken = jwt.sign(
            { id: user.id, email: user.email, name: user.name, surname: user.surname },
            process.env.JWT_SECRET,
            { expiresIn: '15m' } // Short-lived access token
        );

        const refreshToken = crypto.randomBytes(64).toString('hex');
        const refreshTokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');
        const refreshTokenExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

        // Cancella eventuali vecchi refresh token dell'utente
        await db.execute('DELETE FROM refresh_tokens WHERE user_id = ?', [user.id]);

        // Salvataggio nuovo refresh token hashato
        await db.execute(
            'INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?, ?)',
            [user.id, refreshTokenHash, refreshTokenExpiry]
        );

        const accessTokenOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax',
            maxAge: 15 * 60 * 1000 // 15 minutes
        };

        const refreshTokenOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        };

        res.status(200)
            .cookie('accessToken', accessToken, accessTokenOptions)
            .cookie('refreshToken', refreshToken, refreshTokenOptions)
            .json({
                message: "Login effettuato",
                user: { name: user.name, email: user.email, id: user.id }
            });
    } catch (error) {
        console.error("Errore nel server:", error);
        res.status(500).json({ message: "Errore nel server" });
    }
}


const logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        // Clean up expired refresh tokens and the current one
        if (refreshToken) {
            const refreshTokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');
            await db.execute('DELETE FROM refresh_tokens WHERE token = ?', [refreshTokenHash]);
        }

        // Also clean up all expired tokens in the database
        await db.execute('DELETE FROM refresh_tokens WHERE expires_at < NOW()');

        // Clear cookies
        res.clearCookie('accessToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax'
        });

        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax'
        });

        res.status(200).json({ message: "Logout eseguito con successo" });
    } catch (error) {
        console.error("Errore durante il logout:", error);
        res.status(500).json({ message: "Errore durante il logout" });
    }
}

export default { registerUser, login, logout, refreshToken, getCurrentUser };