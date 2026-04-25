import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'admin-user-itineria',
    password: 'llha23_gg#9Fa',
    database: 'itineria_db'
});

console.log("Connected!");

/* let sql = `CREATE TABLE itineraries (
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT NOT NULL,
title VARCHAR(255) NOT NULL,
description MEDIUMTEXT,
waypoints JSON,
details JSON,
shareable BOOL NOT NULL
)`;

await connection.query(sql); */
// console.log("Modifica eseguita");

export default connection;