const Sequelize = require('sequelize');
const sequelize = require('../db.config');

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
        }
    },
    {
        tableName: 'categories',
        underscored: true,
        updatedAt: 'last_updated',
        createdAt: 'timestamp'
    }
);

module.exports = category;