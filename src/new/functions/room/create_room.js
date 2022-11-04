const rooms = require("../../data/rooms")
const Room = require("../../data/Room")

const create_room = (user) => {
  let room = new Room()
  rooms[room.id] = room
  room.join(user)
}

module.exports = create_room