const crudOp = 'read';
const Sequelize = require('sequelize');
const sequelize = require('../sql.config');
const Category = require('../../models/category.model');

module.exports = function readCb(req, res, next) {
    // const client = new Client(dbConfig);
    const catId = req.params.category_id;
    console.log(catId);

        sequelize
        .authenticate()
        .then( ()=> {
            if (catId) {
                console.log("there's a catId", catId);
                Category
                .findOne({
                    where: {
                        id: catId
                    }
                })
                .then(category => res.send(category));
            } else {
                Category
                .findAll()
                .then(categories => {
                    res.send(categories);
                });
            }

        })
        .catch(err=> {
            console.error('bad connect');
            res.status(500).send({error:err, crudOp: 'connection'});
        });
    };