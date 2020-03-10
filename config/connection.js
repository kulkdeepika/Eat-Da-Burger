const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password123",
    database: "burger_db"
});

connection.connect(function(err){
    if(err){
        console.log("Error connecting " + err.stack);
    }

    console.log("Successfully connected with id:  " + connection.threadId);
});

module.exports = connection;