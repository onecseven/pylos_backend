const Sequelize = require("Sequelize")

module.exports = new Sequelize({
  dialect: "sqlite",
  // storage: "./DB.sqlite3",
  storage: "D:/backup/code/gameroom-backend/src/data/db/DB.sqlite3",
  define: {
    timestamps: false
  }
})

