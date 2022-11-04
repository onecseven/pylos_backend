const rooms = require("../../data/rooms")
const Room = require("../../data/Room")
const messages = require("../../messages")

const join_room = (user, data) => {
  let { roomId } = data
  if (rooms.hasOwnProperty(roomId)) {
    let room = rooms[roomId]
    if (room.maxUsers > room.users.length && !room.started && room.users.indexOf(user) == -1) room.join(user)
    else if (room.users.length >= room.maxUsers) user.sendData(messages.FAILED_TO_JOIN_ROOM("room is full"))
    else if (room.started) user.sendData(messages.FAILED_TO_JOIN_ROOM("room is in game"))
    else if (room.users.indexOf(user) != -1) user.sendData(messages.FAILED_TO_JOIN_ROOM("already inside this room"))
  } else {
    user.sendData(messages.FAILED_TO_JOIN_ROOM("wrong code"))
  }
}

module.exports = join_room