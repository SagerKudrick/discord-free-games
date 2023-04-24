const fs = require('fs');

const { username, password, host, database } = require("../settings.json");
var mysql = require('mysql2');

var con = mysql.createConnection({
    host: host,
    user: username,
    password: password,
    database: database,
    multipleStatements: true
    });

con.connect( (err) => {
    if (err) throw err;
});

function insert_article(title, desc, link, imgsrc) {
    try
    {
        const query = `CALL insertarticle('${title}', '${desc}', '${link}', '${imgsrc}')`

        return new Promise((resolve, reject) => {
            con.query(query, (err, result) => {
                if (err) return reject(err);
                
                resolve(result[0].affectedRows);
                
            });
        });
    }
    catch(err) {console.log(err)}

}

function delete_article(title) {
    try
    {
        const query = `CALL deletearticle('${title}')`
 
        return new Promise((resolve, reject) => {
            con.query(query, (err, result) => {
                if (err) return reject(err);
                
                resolve(result[0].affectedRows);
                
            });
        });
    }
    catch(err) {console.log(err)}

}

function get_article(title) {
    try
    {
        const query = `use free_games; CALL getarticle('${title}');`

        return new Promise((resolve, reject) => {
            con.query(query, (err, result) => {
                if (err) return reject(err);
                
                resolve(result[0].affectedRows);
                
            });
        });
    }
    catch(err) {console.log(err)}

}

module.exports = { insert_article, delete_article, get_article };