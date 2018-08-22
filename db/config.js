const mysql = require('mysql');

const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootroot1',
    database: 'ordning'
})

dbConnection.connect(function(err){
    if (err) throw err;
    console.log('You are now connected to DB')
})

module.exports = dbConnection