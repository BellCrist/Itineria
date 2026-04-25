import db from '../database/database_connection.js';

const getUserData = async (req, res) => {
    const cookieData = req.cookies.user_session;

    const userData = JSON.parse(cookieData);

    const [rows] = await db.execute('SELECT * FROM users WHERE id=?', [userData.id])
    const user = rows[0];

    if (!user) {
        return res.status(401).json({ message: "Credenziali non valide" });
    }

    res.status(200)
        .json({
            message: 'Informazioni recuperate',
            info: { name: user.name, surname: user.surname, country: user.country, city: user.city, address: user.address, province: user.province, zipCode: user.zipCode }
        })
}

//Salvataggio delle modifiche dei dati personali dell'utente
const saveUserData = async (req, res) => {
    const { name, surname, country, city, address, province, zipCode } = req.body;
    const sessionData = JSON.parse(req.cookies.user_session);
    const userId = sessionData.id;

    const sql = `UPDATE users
    SET name=?, surname=?, country=?, city=?, address=?, province=?, zipCode=?
    WHERE id=?`;

    const params = [name, surname, country, city, address, province, zipCode, userId];
    console.log(params);
    try {
        const [result] = await db.execute(
            sql,
            params
        );

        if (result.affectedRows === 1) {
            return res.status(200)
                .json({
                    success: true,
                    message: 'Modifiche salvate con successo'
                });
        } else {
            return res.status(404).json({
                success: false,
                message: "Modifica non completata."
            });
        }
    } catch (error){
        console.error("Errore modifica dati profilo utente:", error);
        return res.status(500).json({
            success: false,
            message: "Errore interno del server."
        });
    }
}

export default { getUserData, saveUserData };