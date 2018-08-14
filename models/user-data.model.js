const Sequelize = require('sequelize');
const sequelize = require('../db.config');
const bcrypt = require('bcrypt');
const User = require('./user-auth.model');

const UserData = sequelize.define(
    'user_data', {
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
        /*
The sequelize documentation has a virtual data type: http://docs.sequelizejs.com/variable/index.html#static-variable-DataTypes
And the exact example they give is for passwords.
But those rascals don't account for wanting to get an encrypted password asynchronously.
When I wrapped that inside of a .then() callback, it didn't work.
The whole rest endpoint became non responsive.
I suspect bcrypt is not a thing to use as a setter.

*/
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
        indexes: [
            {
                unique: true,
                fields: ['id', 'user_auth_id'],
            },
        ],
        instanceMethods: {
            comparePassword: async function comparePassword(password) {
                try {
                    const isSame = await bcrypt.compare(password, this.password);

                    return isSame;
                } catch (err) {
                    throw err;
                }
            },
        },
        tableName: 'user_data',
        underscored: true,
        updatedAt: false,
        createdAt: 'timestamp',
    },
);

UserData.belongsTo(User, { as: 'user_auth' });

module.exports = UserData;
