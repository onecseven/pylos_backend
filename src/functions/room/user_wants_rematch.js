const rooms = require("../../data/rooms")
const start_pylos = require("../games/start_pylos")
const messages = require("../messages")
const send_to_room = require("../switchboard/send_to_everyone")

let rematched = (user, roomId) => send_to_room(messages.REMATCH_OFFERED(user), roomId)

const user_wants_rematch = (user, data) => {
  let id = data.gameId
  let room = rooms.get(id)

  if (room && room.hasUser(user)) {
    user.rematch = true
  }

  if (room.users.every((user) => user.rematch === true)) {
    room.users.every(user => user.rematch = false)
    start_pylos(room.users[0], data)
  } else {
    rematched(user, id)
  }
}

module.exports = user_wants_rematch