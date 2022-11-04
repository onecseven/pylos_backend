const rooms = require("../../data/rooms")
const messages = require("../../messages")

const leave_room = (user, data) => {
  let { gameId } = data
  if (rooms.hasOwnProperty[id]) {
    let room = rooms[id]
    room.onUserLeft(user)

    if (room.users.length <= 0) {
      room.onDeleted()
      delete rooms[id]
    }

  }
}

module.exports = leave_room