const pg = require("pg");
const settings = require("./settings"); // settings.json

module.exports = (function() {

  const client = new pg.Client({
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  });

  client.connect((err) => {
    if (err) {
      return console.error("Connection Error", err);
    }
  });

  function lookupByName (name, callback) {
    client.query(`SELECT * FROM famous_people
                  WHERE first_name = $1::text
                  OR last_name = $1::text;`, [name], (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result);
      }
    });
  }

  function finish() { client.end() };

  return {
    lookupByName: lookupByName,
    finish: finish
  };
});
