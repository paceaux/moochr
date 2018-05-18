const Sequelize = require('sequelize');

const dbConfig = {
    user: 'todo',
    host: 'localhost',
    database: 'todo',
    password: 'todo',
    port: 5432
  };

  module.exports = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
      dialect: 'postgres',
      host: dbConfig.host,
      port: dbConfig.port,
      logging: false
  });
/* Create Database
  Command:  CREATE DATABASE todo;
  Validate: \l
*/

/* Create user:
  Command:   CREATE ROLE todo WITH LOGIN PASSWORD 'todo';
  Validate: \du
*/

