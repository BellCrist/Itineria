-- Script di inizializzazione per assegnare i permessi corretti all'utente
GRANT ALL PRIVILEGES ON itineria_db.* TO 'admin-user-itineria'@'%';
GRANT ALL PRIVILEGES ON itineria_db.* TO 'admin-user-itineria'@'localhost';
-- Aggiorna l'utente esistente per usare il plugin nativo compatibile con Node.js
ALTER USER 'admin-user-itineria'@'%' IDENTIFIED WITH mysql_native_password BY 'llha23_gg#9Fa';

FLUSH PRIVILEGES;
