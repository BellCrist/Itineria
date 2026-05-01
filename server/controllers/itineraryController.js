import db from '../database/database_connection.js';

//Lista di itinerari dell'utente loggato
const getItineraryList = async (req, res) => {
    const cookieData = req.cookies.user_session;

    const userData = JSON.parse(cookieData);

    try {
        const [results] = await db.execute('SELECT * from itineraries WHERE user_id=?', [userData.id]);
        if (results) {
            res.status(200)
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

//Recupera un singolo itinerario di un utente
const getItineraryById = async (req, res) => {
    ;
    const userData = JSON.parse(req.cookies.user_session);
    const { id } = req.params;

    try {
        const [results] = await db.execute(
            'SELECT * FROM itineraries WHERE id = ? AND user_id = ?',
            [id, userData.id]
        );

        if (results && results.length > 0) {
            res.status(200).json(results[0]);
        } else {
            return res.status(404).json({ message: "Itinerario non trovato" });
        }
    } catch (error) {
        console.error("Errore ricerca itinerario:", error);
        return res.status(500).json({
            success: false,
            message: "Errore interno del server."
        });
    }
}

//Creazione di un nuovo itinerario
const createItinerary = async (req, res) => {
    const { tripName, tripDescription, waypoints, privateItinerary } = req.body;
    const sessionData = JSON.parse(req.cookies.user_session);
    const userId = sessionData.id;

    const sql = `INSERT INTO itineraries (user_id, title, description, waypoints, shareable)
    VALUES (?,?,?,?,?)`;
    try {
        const [result] = await db.execute(
            sql,
            [userId, tripName, tripDescription, waypoints, privateItinerary]
        );

        if (result.insertId) {
            res.status(201)
                .json({
                    success: true,
                    message: 'Modifiche salvate con successo'
                });
        } else {
            return res.status(404).json({
                success: false,
                message: "Itinerario non salvato."
            });
        }
    } catch (error) {
        console.error("Errore modifica dati profilo utente:", error);
        return res.status(500).json({
            success: false,
            message: "Errore interno del server."
        });
    }
}

//Modifica di un itinerario specifico dell'utente loggato
const updateItinerary = async (req, res) => {
    const { id } = req.params;
    const { tripName, tripDescription, waypoints, privateItinerary } = req.body;
    const sessionData = JSON.parse(req.cookies.user_session);
    const userId = sessionData.id;

    if (!tripName && !tripDescription && !waypoints && typeof privateItinerary === 'undefined') {
        return res.status(400).json({
            success: false,
            message: 'Nessun campo da aggiornare fornito.'
        });
    }

    const fields = [];
    const values = [];

    if (tripName !== undefined) {
        fields.push('title = ?');
        values.push(tripName);
    }
    if (tripDescription !== undefined) {
        fields.push('description = ?');
        values.push(tripDescription);
    }
    if (waypoints !== undefined) {
        fields.push('waypoints = ?');
        values.push(waypoints);
    }
    if (privateItinerary !== undefined) {
        fields.push('shareable = ?');
        values.push(privateItinerary);
    }

    values.push(id, userId);

    const sql = `UPDATE itineraries SET ${fields.join(', ')} WHERE id = ? AND user_id = ?`;

    try {
        const [result] = await db.execute(sql, values);

        if (result.affectedRows > 0) {
            return res.status(200).json({
                success: true,
                message: 'Itinerario aggiornato con successo.'
            });
        }

        return res.status(404).json({
            success: false,
            message: 'Itinerario non trovato o non autorizzato.'
        });
    } catch (error) {
        console.error('Errore aggiornamento itinerario:', error);
        return res.status(500).json({
            success: false,
            message: 'Errore interno del server.'
        });
    }
}

const deleteItinerary = async (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM itineraries WHERE id = ?`;

    try {
        const [result] = await db.execute(sql, [id]);
        if (result) {
            res.status(200)
                .json({
                    success: true,
                    message: 'Itinerario eliminato con successo'
                });
        } else {
            return res.status(404).json({
                success: false,
                message: "Itinerario non eliminato."
            });
        }
    } catch (error) {
        console.error('Errore cancellazione itinerario:', error);
        return res.status(500).json({
            success: false,
            message: 'Errore interno del server.'
        });
    }
}

export default { getItineraryList, getItineraryById, createItinerary, updateItinerary, deleteItinerary };
