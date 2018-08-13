const Sequelize = require('sequelize');
const sequelize = require('../db.config');
const bcrypt = require('bcrypt');

/* 

Originally tried this for passwords: https://nodeontrain.xyz/tuts/secure_password/
That didn't work, so I tried something like this:
https://gist.github.com/JesusMurF/9d206738aa54131a6e7ac88ab2d9084e

*/
function getHashedPassword(password) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) return reject(err);

            return resolve(hash);
        });
    });
}
const User = sequelize.define(
    'user', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: Sequelize.TEXT,
            allowNull: false,
            set(val) {
                this.setDataValue('email', val.toLowerCase().trim());
            },
        },
        /*
The sequelize documentation has a virtual data type: http://docs.sequelizejs.com/variable/index.html#static-variable-DataTypes
And the exact example they give is for passwords.
But those rascals don't account for wanting to get an encrypted password asynchronously.
When I wrapped that inside of a .then() callback, it didn't work.
The whole rest endpoint became non responsive.
I suspect bcrypt is not a thing to use as a setter.

*/
        password: {
            type: Sequelize.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    },
    {
        indexes: [
            {
                unique: true,
                fields: ['email'],
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
        tableName: 'user',
        underscored: true,
        updatedAt: false,
        createdAt: 'timestamp',
    },
);

/*
TODO: Try a better way of setting the password asynchronously.
*/

User.beforeCreate(async (user) => {
    const hashedPassword = await getHashedPassword(user.password);
    user.setDataValue('password', hashedPassword);
});

User.beforeUpdate(async (user) => {
    const hashedPassword = await getHashedPassword(user.password);
    user.setDataValue('password', hashedPassword);
});

module.exports = User;
