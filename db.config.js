const Sequelize = require('sequelize');

const dbConfig = {
    user: 'moochrapp',
    host: 'localhost',
    database: 'moochr',
    password: '#(~q#>FDdJEU2}{',
    port: 5432,
};

module.exports = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    dialect: 'postgres',
    host: dbConfig.host,
    port: dbConfig.port,
    logging: false,
    operatorsAliases: false,
});
/* Create Database
  Command:  CREATE DATABASE moochr;
  Validate: \l
*/

/* Create user:
  Command:   CREATE ROLE moochrapp WITH LOGIN PASSWORD '#(~q#>FDdJEU2{';
  Validate: \du
*/

