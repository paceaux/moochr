const crudOp = 'update';
const sequelize = require('../../db.config');
const User = require('../../models/user-auth.model');

module.exports = {
    byId: async (ctx, next) => {
        await sequelize.authenticate();
        const { id } = ctx.params;

        try {
            const user = await User.findOne({
                where: {
                    id,
                },
            });
            if (user) {
                const result = await user.update(ctx.request.body);

                delete result.password;
                ctx.body = result;
            } else {
                ctx.status = 404;
                ctx.body = { err: 'Record not found', crudOp };
            }
        } catch (err) {
            ctx.status = 500;
            ctx.body = { err, crudOp };
        }
        next();
    },
};
