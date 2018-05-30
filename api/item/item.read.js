const crudOp = 'read';
const Sequelize = require('sequelize');
const sequelize = require('../../db.config');
const Item = require('../../models/item.model');

const Op = Sequelize.Op;

function getSearchQuery(restQuery) {
    if (Object.keys(restQuery).length === 0) return null;

    const searchQuery = Object.assign({}, restQuery);

        /*
        for the most part, we just take the query object and just send it into the "where". So this means we can really search by any field
        only issue is with the category field, which is an array. sequelize wants the argument to _also_ be an array

        Where we have:
        modelA.categories = [1]
        modelB.categories = [1,2]
        ModelC.categories = [2]

        if you search for 1,2
        [Op.contains] will return only modelB
        [Op.contained] would return all three models

        if searching for 1,
        [Op.contains] will return modelA, modelB
        [Op.contained] will return modelA

        I'm debating on whether I'll regret this decision later

        */
       if (searchQuery.category) {
        searchQuery.category = {
            [Op.contains]: [...restQuery.category]
        };
    }
    return {
        where: searchQuery,
    };
}
module.exports = {
    byId: async (ctx, next) => {
        await sequelize.authenticate();
        const id = ctx.params.item_id;

        const result = await Item.findOne({
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
        const searchQuery = getSearchQuery(ctx.query);
        let result;

        if (searchQuery) {
            result = await Item.findAll(searchQuery);
        } else {
            result = await Item.findAll();
        }

        if (Array.isArray(result)) {
            ctx.body = result;
        } else {
            ctx.body = { err: result, crudOp };
        }

        next();
    },
};
