import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'admin-user-itineria',
    password: 'llha23_gg#9Fa',
    database: 'itineria_db'
});

console.log("Connected!");

// Create refresh_tokens table if it doesn't exist
/* const deleteRTColumn = `ALTER TABLE users
DROP COLUMN refresh_token`;

await connection.query(deleteRTColumn);
console.log("Modifica eseguita"); */

export default connection;