const { rooms } = require("../../data/rooms")
const send_to_user = require("./send_to_user")

const send_to_room = (data, roomId) => {
  let room = rooms.get(roomId)
  if (room) {
    room.users.forEach((user) => send_to_user(data, user.id))
  }
}

module.exports = send_to_room