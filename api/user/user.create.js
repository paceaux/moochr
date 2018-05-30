const crudOp = 'create';
const sequelize = require('../../db.config');
const User = require('../../models/user.model');

module.exports = {
    one: async (ctx, next) => {
        await sequelize.authenticate();

        try {
            const result = await User.create(ctx.request.body);

            ctx.body = result;
        } catch (err) {
            ctx.status = 500;
            ctx.body = { err, crudOp };
        }


        next();
    },
};
