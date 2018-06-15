const crudOp = 'create';
const sequelize = require('../../db.config');
const User = require('../../models/user.model');

module.exports = {
    one: async (ctx, next) => {
        await sequelize.authenticate();

        try {
            const result = await User.create(ctx.request.body);
            const { id, email, timestamp } = result;

            ctx.body = { id, email, timestamp };
        } catch (err) {
            ctx.status = 500;
            const { errors } = err;
            const safeErrors = [];

            if (Array.isArray(errors)) {
                ctx.status = 409;
                errors.forEach(error => {
                    safeErrors.push({
                        message: error.message,
                        field: error.path,
                        fieldValue: error.value,
                    });
                });
            }
            ctx.body = { errors: safeErrors, crudOp };
        }


        next();
    },
};
