const rooms = require("../../data/rooms")
const messages = require("../messages")
const send_to_room = require("../switchboard/send_to_everyone")

const leave_room = (user, data) => {
  let id = data.gameId
  let room = rooms.get(id)
  if (room) {
    send_to_room(messages.USER_LEFT(id, user.id))
    if (room.users.length <= 0 && room.started !== false) {
      delete rooms[id]
      //delete from persist
    } else if (room.game) {
      //TODO
      //PERSIST ROOM
    }
  }
}

module.exports = leave_room