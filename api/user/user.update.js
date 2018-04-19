const crudOp = 'update';
const Sequelize = require('sequelize');
const sequelize = require('../../db.config');
const User = require('../../models/user.model');

module.exports = function updateCb(req, res, done) {
    sequelize
        .authenticate()
        .then( ()=> {
            User
                .findOne({
                    where: {
                        id: req.params.user_id
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