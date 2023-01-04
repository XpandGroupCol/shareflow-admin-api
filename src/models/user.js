const { DataTypes } = require('sequelize')
const DB = require('../db')
const User = DB.define('Users', {
  name: DataTypes.STRING,
  email: DataTypes.STRING
})

module.exports = User
