const crudOp = 'read';
const Sequelize = require('sequelize');
const sequelize = require('../../db.config');
const Item = require('../../models/item.model');
const Op = Sequelize.Op;

function getSearchQuery(restQuery) {
    if (Object.keys(restQuery).length === 0) return null;

    const searchQuery = Object.assign({},restQuery);

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
        where: searchQuery
    };
}


module.exports = function readCb(req, res, next) {
    const itemId = req.params.item_id;
    const restQuery = req.query;
    const searchQuery =  getSearchQuery(restQuery);

        sequelize
        .authenticate()
        .then( ()=> {
            if (itemId) {
                Item
                .findOne({
                    where: {
                        id: itemId
                    }
                })
                .then(item => res.send(item))
                .catch(err => res.status(500).send({error: err, crudOp}));
            }
            if (searchQuery) {

                Item
                .findAll(searchQuery)
                .then(items => res.send(items))
                .catch(err => res.status(500).send({error: err, crudOp}));
            } else {
                Item
                .findAll()
                .then(items => {
                    res.send(items);
                })
                .catch(err => res.status(500).send({error: err, crudOp}));
            }

        })
        .catch(err=> {
            console.error('bad connect');
            res.status(500).send({error:err, crudOp: 'connection'});
        });
 };