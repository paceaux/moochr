const dbConfig = require('../db.config.js');
const {Client} = require('pg');
const client = new Client(dbConfig);


const query =   'CREATE TABLE items(id SERIAL PRIMARY KEY, content VARCHAR(40) not null, timestamp TIMESTAMP, type VARCHAR(40) null, complete BOOLEAN not null, status  VARCHAR(40) null);';

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
Command: CREATE TABLE items(id SERIAL PRIMARY KEY, content VARCHAR(40) not null, timestamp TIMESTAMP, type VARCHAR(40) null, complete BOOLEAN not null, status  VARCHAR(40) null);
Validate: \d items

*/


