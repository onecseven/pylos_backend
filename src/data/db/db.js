const Sequelize = require("Sequelize")

module.exports = new Sequelize({
  dialect: "sqlite",
  storage: "D:/backup/code/gameroom-backend/src/data/db/DB.sqlite3",
  logging: false,
})
