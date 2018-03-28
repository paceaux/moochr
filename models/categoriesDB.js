const dbConfig = require('../db.config.js');
const {Client} = require('pg');
const client = new Client(dbConfig);


const query =   'CREATE TABLE categories(id SERIAL PRIMARY KEY, name VARCHAR(40) not null, slug VARCHAR(120) not null, parent VARCHAR(120) null, timestamp TIMESTAMP);';

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
Command: 'CREATE TABLE categories(id SERIAL PRIMARY KEY, name VARCHAR(40) not null, slug VARCHAR(120) not null, parent VARCHAR(120) null, timestamp TIMESTAMP);'

Validate: \d categories

json: {
    "name" : string,
    "slug" : string,
    "timestamp" : timestamp,
    parent: "id of the parent"
}

*/


