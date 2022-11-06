const rooms = require("../../data/rooms")
const join_room = require("./join_room")

const create_room = (user) => {
  let room = rooms.create()
  join_room(user, { roomId: room.id })
}

module.exports = create_room
