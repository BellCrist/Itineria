import db from '../database/models/index.js';

const getUserData = async (req, res) => {
    const cookieData = req.cookies.user_session;

    if (!cookieData) {
        return res.status(401).json({ message: "Non autenticato" });
    }

    const userData = JSON.parse(cookieData);

    try {
        const user = await db.User.findByPk(userData.id);

        if (!user) {
            return res.status(401).json({ message: "Credenziali non valide" });
        }

        res.status(200)
            .json({
                message: 'Informazioni recuperate',
                info: {
                    name: user.name,
                    surname: user.surname,
                    country: user.country,
                    city: user.city,
                    address: user.address,
                    province: user.province,
                    zipCode: user.zipCode
                }
            });
    } catch (error) {
        console.error("Errore recupero dati utente:", error);
        res.status(500).json({ message: "Errore interno del server" });
    }
}

//Salvataggio delle modifiche dei dati personali dell'utente
const saveUserData = async (req, res) => {
    const { name, surname, country, city, address, province, zipCode } = req.body;
    if (!req.cookies.user_session) {
        return res.status(401).json({ message: "Non autenticato" });
    }
    const sessionData = JSON.parse(req.cookies.user_session);
    const userId = sessionData.id;

    try {
        const [affectedRows] = await db.User.update(
            {
                name: name,
                surname: surname,
                country: country,
                city: city,
                address: address,
                province: province,
                zipCode: zipCode
            },
            {
                where: { id: userId }
            }
        );

        if (affectedRows === 1) {
            return res.status(200)
                .json({
                    success: true,
                    message: 'Modifiche salvate con successo'
                });
        } else {
            return res.status(404).json({
                success: false,
                message: 'Utente non trovato'
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

export default { getUserData, saveUserData };