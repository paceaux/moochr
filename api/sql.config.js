const dbConfig = require('../db.config');
const Sequelize = require('sequelize');

module.exports = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    dialect: 'postgres',
    host: dbConfig.host,
    port: dbConfig.port
});