const util = require("util");
const mysql = require("mysql");
let connection;

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host: "localhost",
    //your username
    user: "root",
    //your password
    password: "root",
    database: "burgers_db"
  });
}

//adding connection error handling
connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

//setting up connection.query to use promises instead of callbacks
//this allows us to use the async/await syntax
connection.query = util.promisify(connection.query);

module.exports = connection;
