const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const crudOp = 'login';
const sequelize = require('../../db.config');
const User = require('../../models/user-auth.model');
const authenticate = require('../middlewares/authenticate');

module.exports = async (ctx, next) => {
    await sequelize.authenticate();
    const badEmail = { err: 'UserNotFound', crudOp };
    const badPassword = { err: 'PasswordMismatch', crudOp };
    const missingInfo = { err: 'MissingCredentials', crudOp };
    const { email, password } = ctx.request.body;

    ctx.status = 401; // assume more likely to go wrong than right

    if (!email || !password) {
        ctx.body = missingInfo;
        return;
    }

    try {
        const user = await User.findOne({ where: { email } });
        const isSame = user && bcrypt.compareSync(password, user.password);

        if (user === null) {
            ctx.body = badEmail;
            return;
        }

        if (!isSame) {
            ctx.body = badPassword;
            return;
        }

        if (isSame) {
            // they're legit!!!!!!!!!!!!!!!
            ctx.body = {
                token: authenticate(user),
            };
            ctx.status = 201;
        }
    } catch (err) {
        ctx.status = 500; // I think this is the right code for unable to authenticate
        ctx.body = { err, crudOp };
    }
    next();
};
