const crudOp = 'register';
const sequelize = require('../../db.config');
const User = require('../../models/user-auth.model');


module.exports = async (ctx, next) => {
    await sequelize.authenticate();
    const { id } = ctx.request.body;

    try {
        const result = await User.destroy({
            where: {
                id,
            },
        });

        if (result === 1) {
            ctx.body = result;
        } else {
            ctx.body = { err: 'record not found', crudOp };
            ctx.status = 404;
        }
    } catch (err) {
        ctx.status = 500;
        ctx.body = { err, crudOp };
    }
    next();
};
