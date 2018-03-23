const dbConfig = require('../../db.config');
const {Client} = require('pg');
const crudOp = 'update';

module.exports = function updateCb(req, res, done) {
    const client = new Client(dbConfig);
    const data = req.body;
    const id = req.params.user_id;
    const sqlData = [data.firstname, data.lastname, data.email, data.street1,data.street2, data.city, data.state, data.country, id];

    client.connect()
    .then(()=>{
        client.query('UPDATE users SET firstname=($1), lastname=($2), email=($3),street1=($4),street2=($5),city=($6), state=($7), country=($8)  WHERE id=($9)',sqlData)
        .then(() => {
            client.query('SELECT * FROM users ORDER BY id ASC')
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