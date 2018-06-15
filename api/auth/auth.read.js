const crudOp = 'read';
const sequelize = require('../../db.config');
const User = require('../../models/user.model');

const debugTrigger = 'magicWord';

module.exports = {
    byJson: async (ctx, next) => {
        await sequelize.authenticate();
        const request = ctx.request.body;

        if (request.password) delete request.password;
        const result = await User.findOne({
            where: request,
        });

        ctx.type = 'application/json; charset=utf-8';


        if (result) {
            const { id, email, timestamp } = result;
            ctx.body = { id, email, timestamp };
        } else {
            ctx.body = { err: 'Id was not found', crudOp };
        }

        next();
    },
    all: async (ctx, next) => {
        /*
        TODO: remove this when debugging is finished
        In production, this code should be removed. Never ever ever ever ever reveal a password.
        Even if it's hashed and salted.
        Ever.
        Because I'm worried I'll forget this was here. 
        */
        await sequelize.authenticate();
        const request = ctx.request.body;
        let result = [];
        const hasPermissionToShowAll = request[debugTrigger] && request[debugTrigger].indexOf('please') !== -1;
        const hasPermissionToSeePassword = hasPermissionToShowAll && request[debugTrigger].indexOf('pretty') !== -1;

        if (hasPermissionToShowAll) {
            delete request[debugTrigger];

            result = await User.findAll(request);
        }

        if (!hasPermissionToSeePassword) {
            result = result.map(item => {
                item.password = '';
                return item;
            });
        }


        ctx.body = result;

        next();
    },
};
