const crudOp = 'update';
const sequelize = require('../../db.config');
const User = require('../../models/user-data.model');

module.exports = {
    byId: async (ctx, next) => {
        await sequelize.authenticate();
        const id = ctx.params.user_id;

        const user = await User.findOne({
            where: {
                id,
            },
        });

        if (user) {
            const result = await user.update(ctx.request.body);
            ctx.body = result;
        } else {
            ctx.status = 404;
            ctx.body = { err: 'Record not found', crudOp };
        }
        next();
    },
};
