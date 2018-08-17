const crudOp = 'register';
const sequelize = require('../../db.config');
const User = require('../../models/user-auth.model');
const authenticate = require('../middlewares/authenticate');


module.exports = async (ctx, next) => {
    await sequelize.authenticate();
    const missingInfo = { err: 'MissingCredentials', crudOp };
    const { email, password } = ctx.request.body;

    ctx.status = 400; // assume more likely to go wrong than right

    if (!email || !password) {
        ctx.body = missingInfo;
        return;
    }

    try {
        const newUser = await User.create(ctx.request.body);

        const token = authenticate(newUser);
        const result = Object.assign({ token }, newUser.dataValues);

        delete result.password;

        ctx.body = result;
        ctx.status = 201;
    } catch (err) {
        ctx.status = 500;
        ctx.body = { err, crudOp };
    }
    next();
};
