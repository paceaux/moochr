const dbConfig = require('../db.config');
const {Client} = require('pg');
const crudOp = 'create';

module.exports = function postCb (req, res, next) {
    const client = new Client(dbConfig);

    const body = req.body;
    const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const data = {content: body.content, timestamp };
    if (body.type) data.type = body.type;
    data.complete = false; // can't create a completed task
  
    // Get a Postgres client from the connection pool
    client.connect()
    .then(()=>{
      client.query('INSERT INTO items(content, timestamp, type, complete) values($1, $2, $3, $4)',[data.content, data.timestamp, data.type, data.complete])
      .then((queryRes) => {
        client.query('SELECT * FROM items ORDER BY id ASC')
        .then((rowRes) => {
          res.send(rowRes.rows);
          client.end();
        });
      })
      .catch(queryErr => {
        res.status(500).send({error: queryErr, crudOp});
        client.end();
      });
    })
    .catch((err)=>{
      res.status(500).send({error: err, crudOp: 'connection'});
      client.end();
    });
};