const crudOp = 'create';
const sequelize = require('../../db.config');
const User = require('../../models/userInfo.model');

module.exports = {
    byId: async (ctx, next) => {
        await sequelize.authenticate();
        const id = ctx.params.user_id;

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
    },
};
