const crudOp = 'create';
const sequelize = require('../../db.config');
const Category = require('../../models/category.model');


module.exports = {
    one: async (ctx, next) => {
        await sequelize.authenticate();

        try {
            const result = await Category.create(ctx.request.body);

            ctx.body = result;
        } catch (err) {
            ctx.status = 500;
            ctx.body = { err, crudOp };
        }


        next();
    },
};
