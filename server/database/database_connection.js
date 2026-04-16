let mysql = require('mysql2');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'admin-user-itineria',
    password: 'llha23_gg#9Fa',
    database: 'itineria_db'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    let sql = "CREATE TABLE users (name VARCHAR(255), surname VARCHAR(255), address VARCHAR(255))";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });
});