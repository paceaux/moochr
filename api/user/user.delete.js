const dbConfig = require('../../db.config');
const {Client, Query} = require('pg');
const crudOp = 'delete';

module.exports = function deleteCb(req,res, done) {
    const client = new Client(dbConfig);
    const id = req.params.user_id;

    client.connect()
    .then(() => {
        client.query('DELETE FROM users WHERE id=($1)', [id])
        .then(()=>{
            client.query('DELETE FROM users WHERE id=($1)', [id])
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
    .catch(err => {
        res.status(500).send({error:err, crudOp: 'connection'});
        client.end();
    });
};