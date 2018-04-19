const crudOp = 'create';
const Sequelize = require('sequelize');
const sequelize = require('../sql.config');
const User = require('../../models/user.model');

module.exports = function deleteCb(req,res, done) {
    sequelize
        .authenticate()
        .then( () => {
            User.destroy({
                where: {
                    id: req.params.user_id
                }
            })
            .then((result) => {
                if (result === 1) {
                    res.status(200).json({result: "deleted"});
                } else {
                    res.status(404).json({result: "record not found"});
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send({error: err, crudOp});
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({error: err, crudOp: 'connection'});
        });
};