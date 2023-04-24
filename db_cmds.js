const fs = require('fs');

var mysql = require('mysql2');
var showdb = "SHOW DATABASES LIKE 'free_games'";
const createdb = fs.readFileSync('create_db.sql', 'utf8');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
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

module.exports = con;