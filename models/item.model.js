const Sequelize = require('sequelize');
const sequelize = require('../db.config');
const Category = require('./category.model');
const User = require('./user-data.model');

const Item = sequelize.define(
    'item', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        is_loanable: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
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
            allowNull: true,
        },
        category: {
            type: Sequelize.ARRAY(Sequelize.TEXT),
            allowNull: true,
        },
        /*
                couldn't figure out how to send blobs
                https://stackoverflow.com/questions/6196666/converting-image-to-binary-array-blob-with-html5
                */
        image: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        model_number: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        serial_number: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        time_due: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        time_loaned: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        time_return: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        value: {
            type: Sequelize.FLOAT,
            allowNull: true,
        },
    },
    {
        tableName: 'items',
        underscored: true,
        updatedAt: false,
        createdAt: 'timestamp',
    },
);

Item.belongsToMany(Category, {
    through: 'CategoryItem',
});

Item.belongsTo(User);

module.exports = Item;
