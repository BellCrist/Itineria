-- Script di inizializzazione per assegnare i permessi corretti all'utente
GRANT ALL PRIVILEGES ON itineria_db.* TO 'admin-user-itineria'@'%';
GRANT ALL PRIVILEGES ON itineria_db.* TO 'admin-user-itineria'@'localhost';
FLUSH PRIVILEGES;
