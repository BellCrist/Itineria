import db from '../database/database_connection.js';

const getItineraryList = async (req, res) => {
    const cookieData = req.cookies.user_session;

    const userData = JSON.parse(cookieData);

    try {
        const [results] = await db.execute('SELECT * from itineraries WHERE user_id=?', [userData.id]);
        if (result) {
            res.staus(200)
                .json(results);
        } else {
            return res.status(401).json({ message: "Ricerca non completata" });
        }
    } catch (error) {
        console.error("Errore ricerca itinerari dell'utente:", error);
        return res.status(500).json({
            success: false,
            message: "Errore interno del server."
        });
    }

}

export default { getItineraryList };