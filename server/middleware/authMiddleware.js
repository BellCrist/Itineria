import jwt from 'jsonwebtoken';

//Middleware per la validazione del token in entrata dal client.
const authenticateToken = (req, res, next) => {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(401).json({ message: 'Access token richiesto' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Access token scaduto' });
        }
        return res.status(403).json({ message: 'Access token non valido' });
    }
};

export default authenticateToken;