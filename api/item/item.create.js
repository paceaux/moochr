const crudOp = 'create';
const Sequelize = require('sequelize');
const sequelize = require('../../db.config');
const Item = require('../../models/item.model');

module.exports = function postCb (req, res, next) {
  sequelize
  .authenticate()
  .then(  () => {
    return Item
      .create(req.body)
      .then(item => {
        res.status(200).send(item.dataValues);
      });
  })
  .catch(err => {
    console.log(err);
    res.status(500).send({error: err, crudOp});
  });
};