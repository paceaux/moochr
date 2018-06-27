const crudOp = 'authentication';
const sequelize = require('../../db.config');
const User = require('../../models/user.model');
const passport = require('koa-passport');
const bcrypt = require('bcrypt');

function serialize(user) {
    return {
        data: {
            username: user.username,
            id: user.id,
        },
    };
}

passport.serializeUser((user, done) => {
    done(null, { username: user.username });
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

module.exports = async function authenticate(ctx, next) {
    await sequelize.authenticate();

    const { email, password } = ctx.request.body;

    try {
        const user = await User.findOne({
            where: {
                email,
            },
        });

        if (!user) {
            ctx.status = 401;
            ctx.body = { errors: [{ title: 'user not found', status: 401, crudOp }] };
        }

        const matches =  await bcrypt.compare(password, user.password);

        if (matches) {
            ctx.status = 201;
            ctx.body = serialize(user);
            ctx.login(user);
        } else {
            ctx.status = 401;
            ctx.body = { errors: [{ title: 'password does not match', status: 401, crudOp }] };
        }
    } catch (err) {
        ctx.status = 500;
        ctx.body = {
            errors: [{
                title: err.message,
                status: 500,
                crudOp,
                stack: err.stack,
            }],
        };
    }

    next();
};
