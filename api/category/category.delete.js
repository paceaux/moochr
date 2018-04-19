const crudOp = 'delete';
const Sequelize = require('sequelize');
const sequelize = require('../../db.config');
const Category = require('../../models/category.model');


module.exports = function deleteCb(req,res, done) {

    sequelize
        .authenticate()
        .then( () => {
            Category.destroy({
                where: {
                    id: req.params.category_id
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