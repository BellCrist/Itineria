import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import db from '../database/models/index.js';


//Registrazione di un nuovo utente con salvataggio nel db delle rispettive informazioni:
const registerUser = async (req, res) => {
    const { name, surname, country, city, address, province, zipCode, email, password } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await db.User.create({
            name: name,
            surname: surname,
            address: address,
            zipCode: zipCode,
            city: city,
            province: province,
            country: country,
            email: email,
            password: hashedPassword
        });

        console.log("New user's auto-generated ID:", newUser.id);

        // Generate tokens
        const accessToken = jwt.sign(
            { id: newUser.id, email: email, name: name, surname: surname },
            process.env.JWT_SECRET,
            { expiresIn: '15m' } // Short-lived access token
        );

        const refreshToken = crypto.randomBytes(64).toString('hex');
        const refreshTokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');
        const refreshTokenExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

        // Store refresh token hash in database
        await db.RefreshToken.create({
            userId: newUser.id,
            token: refreshTokenHash,
            expiresAt: refreshTokenExpiry
        });

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
            maxAge: 1 * 24 * 60 * 60 * 1000 // 1 giorno
        };

        res.status(201)
            .cookie('accessToken', accessToken, accessTokenOptions)
            .cookie('refreshToken', refreshToken, refreshTokenOptions)
            .json({
                message: "Registrazione effettuata con successo",
                user: { name: name, email: email, id: newUser.id }
            });
    } catch (error) {
        console.error("Errore db: ", error);
        if (error.name === 'SequelizeUniqueConstraintError') {
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

        // Controllo se il refresh token è ancora valido
        const refreshTokenRecord = await db.RefreshToken.findOne({
            where: {
                token: tokenHash
            },
            include: {
                model: db.User,
                attributes: ['id', 'name', 'surname', 'email']
            }
        });

        if (!refreshTokenRecord || new Date() > refreshTokenRecord.expiresAt) {
            return res.status(403).json({ message: "Refresh token non valido o scaduto" });
        }

        const user = refreshTokenRecord.User;

        // Generate new access token
        const newAccessToken = jwt.sign(
            { id: user.id, email: user.email, name: user.name, surname: user.surname },
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
        const user = await db.User.findOne({ where: { email: email } });

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
        await db.RefreshToken.destroy({
            where: { userId: user.id }
        });

        // Salvataggio nuovo refresh token hashato
        await db.RefreshToken.create({
            userId: user.id,
            token: refreshTokenHash,
            expiresAt: refreshTokenExpiry
        });

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
            await db.RefreshToken.destroy({
                where: { token: refreshTokenHash }
            });
        }

        // Also clean up all expired tokens in the database
        await db.RefreshToken.destroy({
            where: {
                expiresAt: {
                    [Op.lt]: new Date()
                }
            }
        });

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