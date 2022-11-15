const db = require("./db")
const Sequelize = require("Sequelize")

const User = db.define(
  "user",
  {
    user_id: {
      type: Sequelize.TEXT,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
  },
  {
    modelName: "User",
    sequelize: db,
  }
)

const Room = db.define(
  "room",
  {
    room_id: {
      type: Sequelize.TEXT,
      allowNull: false,
      primaryKey: true,
    },
    max_users: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    game: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    host: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    rematch: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    modelName: "Room",
    sequelize: db,
  }
)

const RoomUsers = db.define("room_users", {})

User.belongsToMany(Room, {
  through: {
    model: RoomUsers,
  },
})

Room.belongsToMany(User, {
  through: {
    model: RoomUsers,
  },
})

User.hasOne(Room, {
  foreignKey: "host",
})


module.exports = {
  User,
  Room,
  RoomUsers,
}
