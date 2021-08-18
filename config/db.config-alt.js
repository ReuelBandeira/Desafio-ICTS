const mysql = require('mysql');

//conexão mysql
const dbConn = mysql.createConnection({
  host     : 'localhost',
  user     : 'user',
  password : 'password',
  database : 'desafioicts_reuel'
});

dbConn.connect(function(err) {
  if (err) throw err;
});

module.exports = dbConn;
