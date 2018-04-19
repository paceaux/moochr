const crudOp = 'create';
const Sequelize = require('sequelize');
const sequelize = require('../../db.config');
const User = require('../../models/user.model');

module.exports = function postCb (req, res, next) {
  sequelize
  .authenticate()
  .then(  () => {
    return User
      .create(req.body)
      .then(user => {
        res.status(200).send(user.dataValues);
      });
  })
  .catch(err => {
    res.status(500).send({error: err, crudOp});
  });
};