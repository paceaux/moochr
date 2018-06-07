const crudOp = 'login';
const sequelize = require('../../db.config');
const User = require('../../models/user.model');
const passport = require('koa-passport');

module.exports = async () => {
    await sequelize.authenticate();

    const result = await User.findOne({
        where: {
            id,
        },
    });
};
