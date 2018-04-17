const dbConfig = require('../../db.config');
const {Client, Query} = require('pg');
const crudOp = 'read';

module.exports = function readCb(req, res, next) {
    const client = new Client(dbConfig);
    const catId = req.params.category_id;
    const query = catId ? `SELECT * FROM categories WHERE id=${catId}` : 'SELECT * FROM categories ORDER BY id ASC';

        client.connect()
        .then(()=>{
            client.query(query)
            .then(queryRes=> {
                const result = catId ? queryRes.rows[0] : queryRes.rows;
                res.send(result);
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