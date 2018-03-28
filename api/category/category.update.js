const dbConfig = require('../../db.config');
const {Client} = require('pg');
const crudOp = 'update';

module.exports = function updateCb(req, res, done) {
    const client = new Client(dbConfig);
    const data = req.body;
    const id = req.params.category_id;
    const dataKeys = Object.keys(data).filter(key=> key != 'id' || key != 'timestamp');
    const setArg = dataKeys.map(key => `${key}='${data[key]}'`).toString();

    client.connect()
    .then(()=>{
        client.query(`UPDATE categories SET ${setArg}  WHERE id=${id}`)
        .then(() => {
            client.query('SELECT * FROM categories ORDER BY id ASC')
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