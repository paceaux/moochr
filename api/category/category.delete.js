const crudOp = 'delete';
const sequelize = require('../../db.config');
const Category = require('../../models/category.model');

module.exports = {
    byId: async (ctx, next) => {
        await sequelize.authenticate();
        const id = ctx.params.category_id;

        try {
            const result = await Category.destroy({
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
