const crudOp = 'update';
const Sequelize = require('sequelize');
const sequelize = require('../../db.config');
const Category = require('../../models/category.model');

module.exports = {
    byId: async (ctx, next) => {
        await sequelize.authenticate();
        const id = ctx.params.category_id;

        const category = await Category.findOne({
            where: {
                id,
            },
        });

        if (category) {
            const result = await category.update(ctx.request.body);
            ctx.body = result;
        } else {
            ctx.status = 404;
            ctx.body = { err: 'Record not found', crudOp };
        }
        next();
    },
};
