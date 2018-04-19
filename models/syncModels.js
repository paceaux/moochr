const Sequelize = require('sequelize');
const sequelize = require('../api/sql.config');

const Category = require('./category.model');
const User = require('./user.model');

Category
    .sync()
    .then(() => console.log('Category Synchronized'));

User
    .sync()
    .then( () => console.log('User Synchronized'));
