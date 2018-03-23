const dbConfig = require('../../db.config');
const {Client, Query} = require('pg');
const crudOp = 'read';

module.exports = function readCb(req, res, next) {
    const client = new Client(dbConfig);
    const query = 'SELECT * FROM users ORDER BY id ASC';
    
        client.connect()
        .then(()=>{
            client.query(query)
            .then(queryRes=> {
                res.send(queryRes.rows);
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