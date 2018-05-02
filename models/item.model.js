const Sequelize = require('sequelize');
const sequelize = require('../db.config');
const Category = require('./category.model');
const User = require('./user.model');

const Item = sequelize.define('item', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        is_loanable: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        name: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        owner: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        borrower: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        image: {
            type: Sequelize.BLOB,
            allowNull: true,
        },
        model_number: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        serial_number: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        time_due: {
            type: Sequelize.TIME,
            allowNull: true
        },
        time_loaned: {
            type: Sequelize.TIME,
            allowNull: true,
        },
        time_return: {
            type: Sequelize.TIME,
            allowNull: true
        },
        value: {
            type: Sequelize.FLOAT,
            allowNull: true
        },


    },
    {
        tableName: 'items',
        underscored: true,
        updatedAt: false,
        createdAt: 'timestamp'
    }
);

Item.belongsToMany(Category, {
    through: 'CategoryItem'
});

Item.belongsTo(User);

module.exports = Item;