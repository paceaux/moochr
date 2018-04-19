const crudOp = 'read';
const Sequelize = require('sequelize');
const sequelize = require('../../db.config');
const Category = require('../../models/category.model');

module.exports = function readCb(req, res, next) {
    const catId = req.params.category_id;
        sequelize
        .authenticate()
        .then( ()=> {
            if (catId) {
                Category
                .findOne({
                    where: {
                        id: catId
                    }
                })
                .then(category => res.send(category))
                .catch(err => res.status(500).send({error: err, crudOp}));
            } else {
                Category
                .findAll()
                .then(categories => {
                    res.send(categories);
                })
                .catch(err => res.status(500).send({error: err, crudOp}));
            }

        })
        .catch(err=> {
            console.error('bad connect');
            res.status(500).send({error:err, crudOp: 'connection'});
        });
    };