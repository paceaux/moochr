const dbConfig = require('../db.config.js');
const {Client} = require('pg');
const client = new Client(dbConfig);


const query =   'CREATE TABLE users(id SERIAL PRIMARY KEY, firstname VARCHAR(120) not null, lastname VARCHAR(120) null, email VARCHAR(120) not null, password VARCHAR(60) null, timestamp TIMESTAMP, phone VARCHAR(12) null, street1 VARCHAR(120) null, street2 VARCHAR(120) null,zip VARCHAR(10) null, city VARCHAR(120) null, state VARCHAR(40) null, country VARCHAR(40) null );';

client.connect()
.then(()=>{
  client.query(query)
  .then(queryRes=> {
    console.log('table created',queryRes);
    client.end();
  })
  .catch(queryErr => {
    console.error('error creating Table', queryErr);
    client.end();
  });
})
.catch( err => {
  console.error('error connecting', err);
  client.end();
});


/* Create Table
Command: CREATE TABLE users(id SERIAL PRIMARY KEY, firstname VARCHAR(120) not null, lastname VARCHAR(120) null, email VARCHAR(120) not null, timestamp TIMESTAMP, phone VARCHAR(12) null, street1 VARCHAR(120) null, street2 VARCHAR(120) null, city VARCHAR(120) null, state VARCHAR(40) null, country VARCHAR(40) null );

Validate: \d users

*/


