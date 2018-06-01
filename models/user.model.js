const Sequelize = require('sequelize');
const sequelize = require('../db.config');
const bcrypt = require('bcrypt');

function hasSecurePassword(user, options, callback) {
    if (user.password != user.password_confirmation) {
        throw new Error("Password confirmation doesn't match Password");
    }
    bcrypt.hash(user.get('password'), 10, (err, hash) => {
        if (err) return callback(err);
        user.set('password_digest', hash);
        return callback(null, options);
    });
}

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
        password_digest: {
            type: Sequelize.STRING,
            validate: {
                notEmpty: true,
            },
        },
        password: {
            type: Sequelize.VIRTUAL,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        password_confirmation: {
            type: Sequelize.VIRTUAL,
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
        indexes: [
            {
                unique: true,
                fields: ['email'],
            }],
        instanceMethods: {
            authenticate(value) {
                let result = false;

                if (bcrypt.compareSync(value, this.password_digest)) {
                    result = this;
                }

                return result;
            },
        },
        tableName: 'users',
        underscored: true,
        updatedAt: false,
        createdAt: 'timestamp',
    },
);

User.beforeCreate((user, options, callback) => {
    const newUser = user;
    newUser.email = user.email.toLowerCase();

    if (newUser.password) {
        hasSecurePassword(newUser, options, callback);
    } else {
        return callback(null, options);
    }
});

User.beforeUpdate((user, options, callback) => {
    const newUser = user;
    newUser.email = user.email.toLowerCase();

    if (newUser.password) {
        hasSecurePassword(newUser, options, callback);
    } else {
        return callback(null, options);
    }
});

module.exports = User;
