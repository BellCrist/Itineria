import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'admin-user-itineria',
    password: 'llha23_gg#9Fa',
    database: 'itineria_db'
});

console.log("Connected!");


const sql = `
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        surname VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        zipCode VARCHAR(20) NOT NULL,
        city VARCHAR(100) NOT NULL,
        province VARCHAR(10) NOT NULL,
        country VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
    )`;

await connection.query(sql);
console.log("Table 'users' verified/created");

export default connection;