const crudOp = 'read';
const Sequelize = require('sequelize');
const sequelize = require('../sql.config');
const User = require('../../models/user.model');

module.exports = function readCb(req, res, next) {
    const userId = req.params.user_id;
        sequelize
        .authenticate()
        .then( ()=> {
            if (userId) {
                User
                .findOne({
                    where: {
                        id: userId
                    }
                })
                .then(user => res.send(user))
                .catch(err => res.status(500).send({error: err, crudOp}));
            } else {
                User
                .findAll()
                .then(users => {
                    res.send(users);
                })
                .catch(err => res.status(500).send({error: err, crudOp}));
            }

        })
        .catch(err=> {
            console.error('bad connect');
            res.status(500).send({error:err, crudOp: 'connection'});
        });
 };