const Sequelize = require('sequelize');
const sequelize = require('../db.config');

const User = sequelize.define(
    'user', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstname: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        lastname: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        email: {
            type: Sequelize.TEXT,
            allowNull: false,
            set(val) {
                this.setDataValue('email', val.toLowerCase().trim());
            },
        },
        password: {
            type: Sequelize.VIRTUAL,
            allowNull: true,
        },
        phone: {
            type: Sequelize.TEXT,
            allowNull: true,
            set(val) {
                this.setDataValue('phone', val.replace(/\s/g, ''));
            },
        },
        street1: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        street2: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        zip: {
            type: Sequelize.TEXT,
            allowNull: true,
            set(val) {
                this.setDataValue('zip', val.trim());
            },
        },
        city: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        state: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        country: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
    },
    {
        tableName: 'users',
        underscored: true,
        updatedAt: false,
        createdAt: 'timestamp',
    },
);

module.exports = User;
