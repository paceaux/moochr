const dbConfig = require('../../db.config');
const {Client, Query} = require('pg');
const crudOp = 'read';
const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    dialect: 'postgres',
    host: dbConfig.host,
    port: dbConfig.port
});


module.exports = function readCb(req, res, next) {
    // const client = new Client(dbConfig);
    const catId = req.params.category_id;
    const query = catId ? `SELECT * FROM categories WHERE id=${catId}` : 'SELECT * FROM categories ORDER BY id ASC';

    const Category = sequelize.define('category', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true

        },
        name: {
            type: Sequelize.STRING
        },
        slug: {
            type: Sequelize.STRING
        },
        parent: {
            type: Sequelize.INTEGER
        },
        timestamp: Sequelize.DATE
    });

    Category.sync()
        .then(() => {
            return Category.create({
                name: 'sync-test',
                slug: 'whatevs'
            });
        });

        sequelize
        .authenticate()
        .then( ()=> {
            console.log('yay!');
            Category.findAll().then((users) => {
                res.send(users);
            })
        })
        .catch(err=> {
            console.error('bad connect');
        });
        // client.connect()
        // .then(()=>{
        //     client.query(query)
        //     .then(queryRes=> {
        //         const result = catId ? queryRes.rows[0] : queryRes.rows;
        //         res.send(result);
        //         client.end();
        //     })
        //     .catch(queryErr=>{
        //         res.status(500).send({error: queryErr,crudOp});
        //         client.end();
        //     });
        // })
        // .catch(err => {
        //     res.status(500).send({error:err,crudOp: 'connection'});
        //     client.end();
        // });
    };