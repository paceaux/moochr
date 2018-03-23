const dbConfig = require('../../db.config');
const {Client} = require('pg');
const crudOp = 'create';

module.exports = function postCb (req, res, next) {
    const client = new Client(dbConfig);

    const data = req.body;
    const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
    data.timestamp = timestamp;
    const dataKeys = Object.keys(data).toString();
    const sqlData = Object.keys(data).map( key=>  typeof data[key] == 'string' ? `'${data[key]}'` : data[key]);
  
    const query = `INSERT INTO users(${dataKeys}) values(${sqlData.toString()})`;
    console.log(query);
    // Get a Postgres client from the connection pool
    client.connect()
    .then(()=>{
      client.query(query)
      .then((queryRes) => {
        client.query('SELECT * FROM users ORDER BY id ASC')
        .then((rowRes) => {
          res.send(rowRes.rows);
          client.end();
        });
      })
      .catch(queryErr => {
        console.log(queryErr);
        res.status(500).send({error: queryErr, crudOp});
        client.end();
      });
    })
    .catch((err)=>{
      res.status(500).send({error: err, crudOp: 'connection'});
      client.end();
    });
};