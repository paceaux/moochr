const crudOp = 'update';
const Sequelize = require('sequelize');
const sequelize = require('../../db.config');
const Category = require('../../models/category.model');

module.exports = function updateCb(req, res, done) {
    sequelize
        .authenticate()
        .then( ()=> {
            Category
                .findOne({
                    where: {
                        id: req.params.category_id
                    }
                })
                .then(result => {
                    result
                        .update(req.body)
                        .then(updateResult => {
                            res.send(updateResult);
                        })
                        .catch(err => {
                            res.status(500).send({error: err, crudOp});
                        })
                })
                .catch(err => {
                    res.status(404).send({error: err,crudOp: 'findOne'});
                });
        })
        .catch(err => {
            res.status(500).send({error: err, crudOp: 'connection'});
        });
};