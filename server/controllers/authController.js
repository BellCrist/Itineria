exports.registerUser = (req, res) => {
    const { nome, cognome, nazione, città, indirizzo, provincia, cap, email, password} = req.body;

    console.log("Dati ricevuti: ", email,password,nazione);

    if(!email || !password){
        return res.status(400).json({message: "Email e password obbligatori"});
    }

    res.status(201).json({
        message: "Utente registrato con successo!",
        user: {nome, cognome}
    })
}