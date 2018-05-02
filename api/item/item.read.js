const crudOp = 'read';
const Sequelize = require('sequelize');
const sequelize = require('../../db.config');
const Item = require('../../models/item.model');

module.exports = function readCb(req, res, next) {
    const itemId = req.params.item_id;
        sequelize
        .authenticate()
        .then( ()=> {
            if (itemId) {
                Item
                .findOne({
                    where: {
                        id: itemId
                    }
                })
                .then(item => res.send(item))
                .catch(err => res.status(500).send({error: err, crudOp}));
            } else {
                Item
                .findAll()
                .then(items => {
                    res.send(items);
                })
                .catch(err => res.status(500).send({error: err, crudOp}));
            }

        })
        .catch(err=> {
            console.error('bad connect');
            res.status(500).send({error:err, crudOp: 'connection'});
        });
 };