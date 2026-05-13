import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'admin-user-itineria',
    password: 'llha23_gg#9Fa',
    database: 'itineria_db'
});

console.log("Connected!");

/* let sql = `ALTER TABLE itineraries
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`;

await connection.query(sql);
console.log("Modifica eseguita"); */

export default connection;