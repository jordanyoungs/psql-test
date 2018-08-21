const settings = require("./settings");

const knex = require('knex')({
  client: 'pg',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  },

});

module.exports = (function() {

  function lookupByName(name, callback) {
    knex.select().from('famous_people')
        .where('first_name', 'ilike', `%${name}%`)
        .orWhere('last_name', 'ilike', `%${name}%`)
        .catch((err) => {
          callback(err);
        })
        .then((result) => {
          callback(null, result);
        });
  }

  function insert(f_name, l_name, birthdate) {
    knex('famous_people').insert({
      first_name: f_name,
      last_name: l_name,
      birthdate: birthdate
    }).then(()=> {knex.destroy()});
  }

  function finish() {
    knex.destroy();
  }

  return {
    lookupByName: lookupByName,
    finish: finish,
    insert: insert
  }
});
