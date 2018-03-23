const dbConfig = require('../../db.config');
const {Client} = require('pg');
const crudOp = 'create';

module.exports = function postCb (req, res, next) {
    const client = new Client(dbConfig);

    const data = req.body;
    const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const dataKeys = Object.keys(data);
    const sqlData = Object.keys(data).map( key=>  data[key] || ' ');

  
    console.log(Object.keys(data));
    console.log('========');
    console.log(sqlData.toString());
    // Get a Postgres client from the connection pool
    client.connect()
    .then(()=>{
      client.query(`INSERT INTO users(${dataKeys}) values(${sqlData.toString()})`)
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