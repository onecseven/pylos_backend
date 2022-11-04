const rooms = require("../../data/rooms")
const start_pylos = require("../games/start_pylos")
const messages = require("../../messages")

const user_wants_rematch = (user, data) => {
  let id = data.gameId
  let room = rooms[id]

  if (room && room.hasUser(user)) {
    user.rematch = true
  }
  if (room.users.every((user) => user.rematch === true)) {
    room.users.every(user => user.rematch = false)
    start_pylos(room.users[0], data)
  } else {
    room.sendDataToEveryone(messages.REMATCH_OFFERED(user))
  }

}

module.exports = user_wants_rematch