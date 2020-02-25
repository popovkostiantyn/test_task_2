const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('config');

const logger = require('../middleware/logger');

const basename = path.basename(__filename);
const db = {};

const sequelize = new Sequelize(config.get('db.dbname'), config.get('db.user'), config.get('db.password'), {
  host: config.get('db.host'),
  port: config.get('db.port'),
  dialect: config.get('db.dialect'),
  logging: (sql) => logger.info(sql),
});

fs
  .readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
