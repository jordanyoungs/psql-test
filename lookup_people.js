const famousdb = require('./test_script')();
const name = process.argv[2];

console.log("Searching...");

// Found 2 person(s) by the name 'Paul':
// - 1: Paul Rudd, born '1969-04-06'
// - 2: Paul Giamatti, born '1967-06-06'

famousdb.lookupByName(name, (err, res) => {
  console.log(`Found ${res.rows.length} persons by the name '${name}:'`);

  for (let i = 0; i < res.rows.length; i++) {
    const person = res.rows[i];
    const birthday = person.birthdate.toString().slice(4,15);
    console.log(`- ${i+1}: ${person.first_name} ${person.last_name}, born ${birthday}`);
  }

  famousdb.finish();
  }
);
