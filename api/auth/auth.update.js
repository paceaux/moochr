const crudOp = 'update';
const sequelize = require('../../db.config');
const User = require('../../models/user.model');

module.exports = {
    byJson: async (ctx, next) => {
        await sequelize.authenticate();
        const request = ctx.request.body;
        const userId = ctx.request.body && ctx.request.body.id;

        delete request.id;

        const user = await User.findOne({
            where: {
                userId,
            },
        });

        if (user) {
            const result = await user.update(request);
            const { id, email, timestamp } = result;

            ctx.body = { id, email, timestamp };
        } else {
            ctx.status = 404;
            ctx.body = { err: 'Record not found', crudOp };
        }
        next();
    },
};
