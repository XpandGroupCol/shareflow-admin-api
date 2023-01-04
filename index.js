require('dotenv').config()

const express = require('express')

const logger = require('./src/libs/winston')

const User = require('./src/models/user')
const DB = require('./src/db')

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/create', async (req, res) => {
  try {
    const user = await User.create({ name: 'Diego', email: 'diegocontreras1219@gmail.com' })
    res.status(200).json({ user })
  } catch (e) {
    res.status(500).json({ error: e })
    console.error({ e })
  }
})

app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll({ where: { email: 'diegocontreras1219@gmail.com' }, offset: 2, limit: 1 })
    res.status(200).json({ users })
  } catch (e) {
    res.status(500).json({ error: e })
    console.error({ e })
  }
})

const startApp = async () => {
  try {
    app.listen(process.env.PORT, () => {
      console.log(`${process.env.PORT} is the magic port`)
    })
    await DB.authenticate()
  } catch (e) {
    process.on('uncaughtException', console.log({ e }))
    process.on('unhandledRejection', console.log({ e }))

    // Handled DB exceptions - MongoDB
    process.on('SIGINT', DB.close())
    process.on('SIGTERM', DB.close())
    logger.info(`Start app is failed with error: ${e}`)
    console.error(e)
  }
}

startApp()
