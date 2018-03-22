const dbConfig = require('../db.config');
const {Client} = require('pg');
const crudOp = 'update';

module.exports = function updateCb(req, res, done) {
    const client = new Client(dbConfig);
    const data = req.body;
    const id = req.params.todo_id;

    client.connect()
    .then(()=>{
        client.query('UPDATE items SET content=($1), type=($2), complete=($3),status=($4) WHERE id=($5)',[data.content, data.type ,data.complete, data.status, id])
        .then(() => {
            client.query('SELECT * FROM items ORDER BY id ASC')
            .then((rowRes)=> {
                res.send(rowRes.rows);
                client.end();
            });
        })
        .catch(queryErr => {
            res.status(500).send({error:queryErr, crudOp});
            client.end();
        });
    })
    .catch(err => {
        res.status(500).send({error:err, crudOp: 'connection'});
        client.end();
    });
};