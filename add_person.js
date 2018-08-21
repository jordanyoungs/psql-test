const famousdb = require('./knex_script')();
const f_name = process.argv[2];
const l_name = process.argv[3];
const birthdate = process.argv[4];

console.log("Inserting...");

famousdb.insert(f_name, l_name, birthdate);
