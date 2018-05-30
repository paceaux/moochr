const crudOp = 'update';
const sequelize = require('../../db.config');
const Item = require('../../models/item.model');

module.exports = {
    byId: async (ctx, next) => {
        await sequelize.authenticate();
        const id = ctx.params.item_id;

        const item = await Item.findOne({
            where: {
                id,
            },
        });

        if (item) {
            const result = await item.update(ctx.request.body);
            ctx.body = result;
        } else {
            ctx.status = 404;
            ctx.body = { err: 'Record not found', crudOp };
        }
        next();
    },
};