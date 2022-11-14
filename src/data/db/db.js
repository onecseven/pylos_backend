const Sequelize = require("Sequelize")

module.exports = new Sequelize({
  dialect: "sqlite",
  storage: "./DB.sqlite3",
  define: {
    timestamps: false
  }
})

