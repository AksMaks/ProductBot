'use strict';

const Sequelize = require("sequelize");
require("dotenv").config();

const {
  DEV_USERNAME,
  DEV_PASSWORD,
  DEV_DATABASE,
  DEV_HOST,
  DEV_PORT
} = process.env

const config = {
  "username": DEV_USERNAME,
  "password": DEV_PASSWORD,
  "database": DEV_DATABASE,
  "host":   DEV_HOST,
  "port": DEV_PORT,
  "dialect": "postgres",
  "dialectOptions": {
    "multipleStatements": true
  }
}
const db = {};

let sequelize;

sequelize = new Sequelize(config.database, config.username, config.password, config);
/*
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    console.log(path.join(__dirname, file))
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });
*/
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;