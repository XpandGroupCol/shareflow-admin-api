const { Sequelize } = require('sequelize')
const logger = require('../libs/winston')
const config = require('../config')

const DB = new Sequelize(config.dbName, config.dbUsername, config.dbPassword, {
  host: config.dbHost,
  dialect: 'mysql',
  logging: msg => logger.info(msg)
})

module.exports = DB
