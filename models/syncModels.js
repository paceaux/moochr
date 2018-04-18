const Sequelize = require('sequelize');
const sequelize = require('../api/sql.config');

const Category = require('./category.model');

Category
    .sync()
    .then(() => console.log('syncrhonized'));
