const crudOp = 'register';
const sequelize = require('../../db.config');
const User = require('../../models/user-auth.model');
const UserData = require('../../models/user-data.model');


module.exports = {
    byId: async (ctx, next) => {
        await sequelize.authenticate();
        const { id } = ctx.params;
        // const destroyData = ctx.request.body && ctx.request.body.destroyData === true;

        try {
            const result = await User.destroy({
                where: {
                    id,
                },
            });


            // if (destroyData) {
            //     await UserData.destroy({ where: { user_auth_id: id } });
            // }

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
