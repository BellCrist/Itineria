import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../database/database_connection.js';

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

        //TODO eseguire il check sull'esistenza di un altro utente che ha già quella mail, visto che il campo sul db è UNIQUE

        if (result) {
            const cookiesOptions = {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // true solo in HTTPS (produzione)
                sameSite: 'Lax',
                maxAge: 24 * 60 * 60 * 1000
            };

            const JWToken = jwt.sign(
                { id: result.insertId, email: email, name: name, surname: surname },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.status(201)
                .cookie('token', JWToken, cookiesOptions)
                .json({
                    message: "Login effettuato",
                    user: { name: name, email: email, id: result.insertId }
                });
        } else {
            return res.status(401).json({ message: "Credenziali non" });
        }
    } catch (error) {
        console.error("Errore db: ", error);
        res.status(500).json({ error: "Errore creazione utente" });
    }
}

const logout = async (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax'
    });
    res.status(200).json({ message: "Logout eseguito con successo" });
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const cookiesOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // true solo in HTTPS (produzione)
        sameSite: 'Lax',
        maxAge: 24 * 60 * 60 * 1000
    };

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

        const JWToken = jwt.sign(
            { id: user.id, email: user.email, name: user.name, surname: user.surname },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200)
            .cookie('token', JWToken, cookiesOptions)
            .json({
                message: "Login effettuato",
                user: { name: user.name, email: user.email, id: user.id }
            });
    } catch (error) {
        console.error("Errore nel server:", error);
        res.status(500).json({ message: "Errore nel server" });
    }
}

export default { registerUser, login, logout };