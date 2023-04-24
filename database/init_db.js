const fs = require('fs');

const { username, password, host, database } = require("../settings.json");
var mysql = require('mysql2');
var showdb = "SHOW DATABASES LIKE '" + database + "'";
const createdb = fs.readFileSync('./database/create_db.sql', 'utf8');

initialize_db = () => {
  var con = mysql.createConnection({
      host: host,
      user: username,
      password: password,
      multipleStatements: true
    });

  con.connect( (err) => {
    if(err) throw err;

    console.log("Connected to DB.");

    con.query(showdb, (err, result) => {
      if (err) throw err;

      if(result.length > 0)
        console.log("DB exists");
      else
      {
        con.query(createdb, (err, results) => {
          if (err) throw err;

          else
          {
            console.log(results)
          }
        });
      }
    });
  });
}

module.exports = { initialize_db };