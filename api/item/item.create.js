const crudOp = 'create';
const sequelize = require('../../db.config');
const Item = require('../../models/item.model');

module.exports = {
    one: async (ctx, next) => {
        await sequelize.authenticate();

        try {
            const result = await Item.create(ctx.request.body);

            ctx.body = result;
        } catch (err) {
            ctx.status = 500;
            ctx.body = { err, crudOp };
        }


        next();
    },
};
