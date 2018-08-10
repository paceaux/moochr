const crudOp = 'read';
const sequelize = require('../../db.config');
const User = require('../../models/user-data.model');

module.exports = {
    byId: async (ctx, next) => {
        await sequelize.authenticate();
        const id = ctx.params.user_id;

        const result = await User.findOne({
            where: {
                id,
            },
        });

        if (!id) {
            ctx.type = 'application/json; charset=utf-8';
            ctx.status = 400;
            ctx.body = { err: 'No id provided', crudOp };
        }

        if (id && !result) {
            ctx.type = 'application/json; charset=utf-8';
            ctx.status = 404;
            ctx.body = { err: 'Id was not found', crudOp };
        }

        if (id && result) {
            ctx.body = result;
        }

        next();
    },
    all: async (ctx, next) => {
        await sequelize.authenticate();

        const result = await User.findAll();

        if (Array.isArray(result)) {
            ctx.body = result;
        } else {
            ctx.body = { err: result, crudOp };
        }

        next();
    },
};
