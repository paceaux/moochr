const crudOp = 'register';
const sequelize = require('../../db.config');
const User = require('../../models/user-auth.model');


module.exports = async (ctx, next) => {
    await sequelize.authenticate();

    try {
        const result = await User.create(ctx.request.body);
        if (result) delete result.password;
        ctx.body = result;
    } catch (err) {
        ctx.status = 500;
        ctx.body = { err, crudOp };
    }
    next();
};
