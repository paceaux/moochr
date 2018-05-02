const crudOp = 'update';
const Sequelize = require('sequelize');
const sequelize = require('../../db.config');
const Item = require('../../models/item.model');

module.exports = function updateCb(req, res, done) {
    sequelize
        .authenticate()
        .then( ()=> {
            Item
                .findOne({
                    where: {
                        id: req.params.item_id
                    }
                })
                .then(result => {
                    result
                        .update(req.body)
                        .then(updateResult => {
                            res.send(updateResult);
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).send({error: err, crudOp});
                        });
                })
                .catch(err => {
                    res.status(404).send({error: err,crudOp: 'findOne'});
                });
        })
        .catch(err => {
            res.status(500).send({error: err, crudOp: 'connection'});
        });
};