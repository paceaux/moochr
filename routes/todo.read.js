const dbConfig = require('../db.config');
const {Client, Query} = require('pg');
const crudOp = 'read';

module.exports = function readCb(req, res, next) {
const client = new Client(dbConfig);
const query = 'SELECT * FROM items ORDER BY id ASC';

    client.connect()
    .then(()=>{
        client.query(query)
        .then(queryRes=> {
            res.send({items: queryRes.rows});
            client.end();
        })
        .catch(queryErr=>{
            res.status(500).send({error: queryErr,crudOp});
            client.end();
        });
    })
    .catch(err => {
        res.status(500).send({error:err,crudOp: 'connection'});
        client.end();
    });
};