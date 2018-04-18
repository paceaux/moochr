const crudOp = 'create';
const Sequelize = require('sequelize');
const sequelize = require('../sql.config');
const Category = require('../../models/category.model');


module.exports = function postCb (req, res, next) {

    sequelize
      .authenticate()
      .then(  () => {
        return Category
          .create(req.body)
          .then(category => {
            res.status(200).send(category.dataValues);
          });
      })
      .catch(err => {
        res.status(500).send({error: err, crudOp});
      });
};