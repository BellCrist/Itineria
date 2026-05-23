import { Op } from 'sequelize';
import db from '../database/models/index.js';

//Lista di itinerari dell'utente loggato
const getItineraryList = async (req, res) => {
    const cookieData = req.cookies.user_session;

    if (!cookieData) {
        return res.status(401).json({ message: "Non autenticato" });
    }

    const userData = JSON.parse(cookieData);

    try {
        const results = await db.Itinerary.findAll({
            where: { userId: userData.id }
        });

        res.status(200).json(results);
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
    if (!req.cookies.user_session) {
        return res.status(401).json({ message: "Non autenticato" });
    }
    const userData = JSON.parse(req.cookies.user_session);
    const { id } = req.params;

    try {
        const result = await db.Itinerary.findOne({
            where: {
                id: id,
                userId: userData.id
            }
        });

        if (result) {
            res.status(200).json(result);
        } else {
            return res.status(404).json({ message: "Itinerario non trovato" });
        }
    } catch (error) {
        console.error("Errore recupero itinerario:", error);
        return res.status(500).json({
            success: false,
            message: "Errore interno del server."
        });
    }
}

//Creazione di un nuovo itinerario
const createItinerary = async (req, res) => {
    const { tripName, tripDescription, waypoints, privateItinerary } = req.body;
    if (!req.cookies.user_session) {
        return res.status(401).json({ message: "Non autenticato" });
    }
    const sessionData = JSON.parse(req.cookies.user_session);
    const userId = sessionData.id;

    try {
        const newItinerary = await db.Itinerary.create({
            userId: userId,
            title: tripName,
            description: tripDescription,
            waypoints: waypoints,
            privateItinerary: privateItinerary
        });

        if (newItinerary.id) {
            res.status(201)
                .json({
                    success: true,
                    message: 'Itinerario creato con successo'
                });
        } else {
            return res.status(500).json({
                success: false,
                message: "Itinerario non salvato."
            });
        }
    } catch (error) {
        console.error("Errore creazione itinerario:", error);
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
    if (!req.cookies.user_session) {
        return res.status(401).json({ message: "Non autenticato" });
    }
    const sessionData = JSON.parse(req.cookies.user_session);
    const userId = sessionData.id;

    const updateData = {};
    if (tripName !== undefined) updateData.title = tripName;
    if (tripDescription !== undefined) updateData.description = tripDescription;
    if (waypoints !== undefined) updateData.waypoints = waypoints;
    if (privateItinerary !== undefined) updateData.privateItinerary = privateItinerary;

    if (Object.keys(updateData).length === 0) {
        return res.status(400).json({
            success: false,
            message: 'Nessun campo da aggiornare fornito.'
        });
    }

    try {
        const [affectedRows] = await db.Itinerary.update(updateData, {
            where: {
                id: id,
                userId: userId
            }
        });

        if (affectedRows === 1) {
            return res.status(200).json({
                success: true,
                message: 'Itinerario aggiornato con successo.'
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'Itinerario non trovato o non autorizzato.'
            });
        }
    } catch (error) {
        console.error('Errore aggiornamento itinerario:', error);
        return res.status(500).json({
            success: false,
            message: 'Errore interno del server.'
        });
    }

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
}

//Cancellazione di un itinerario
const deleteItinerary = async (req, res) => {
    const { id } = req.params;
    if (!req.cookies.user_session) {
        return res.status(401).json({ message: "Non autenticato" });
    }
    const sessionData = JSON.parse(req.cookies.user_session);
    const userId = sessionData.id;

    try {
        const deletedRows = await db.Itinerary.destroy({
            where: {
                id: id,
                userId: userId
            }
        });

        if (deletedRows === 1) {
            res.status(200)
                .json({
                    success: true,
                    message: 'Itinerario eliminato con successo'
                });
        } else {
            return res.status(404).json({
                success: false,
                message: 'Itinerario non trovato o non autorizzato'
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

//Ricerca di itinerari in base alla destinazione passata come parametro
const searchItineraries = async (req, res) => {
    const { destination } = req.query;
    if (!destination) {
        return res.status(400).json({ error: "Inserisci un termine di ricerca" });
    }

    try {
        // Usiamo db.Itinerary (assicurati che il nome del modello sia corretto)
        const itineraries = await db.Itinerary.findAll({
            where: {
                privateItinerary: 1,

                // Sequelize.where esegue la funzione MySQL JSON_SEARCH in modo sicuro
                [Op.and]: db.sequelize.where(
                    db.sequelize.fn(
                        'JSON_SEARCH',
                        db.sequelize.col('waypoints'),
                        'one',                         // Cerca la prima occorrenza
                        `%${destination}%`,
                        null,                          // Nessun carattere di escape speciale
                        '$[*].destination'             // Cerca solo nelle chiavi 'destination'
                    ),
                    { [Op.not]: null } // Se JSON_SEARCH non restituisce NULL, significa che c'è un match
                )
            }
        });

        res.status(200).json(itineraries);
    } catch (error) {
        console.error("Errore DB:", error);
        res.status(500).json({ error: "Errore durante la ricerca nel database" });
    }
}

export default { getItineraryList, getItineraryById, createItinerary, updateItinerary, deleteItinerary, searchItineraries };
