const Sequelize = require('sequelize');
const sequelize = require('../api/sql.config');

const category = sequelize.define('category', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true

        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        slug: {
            type: Sequelize.STRING,
            allowNull: false
        },
        parent: {
            type: Sequelize.STRING,
            allowNull: true
        },
        timestamp: {
            type: Sequelize.DATE,
        }
    },
    {
        tableName: 'categories',
        underscored: true,
        updatedAt: false,
        createdAt: false
    }
);

module.exports = category;