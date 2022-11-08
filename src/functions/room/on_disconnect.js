const rooms = require("../../data/rooms")
const users = require("../../data/users")

const on_disconnect = async (user, room) => {
  room.disconnected(user.id)
  let no_users_left = room.users.every(user => user.connected === false)

  if (no_users_left && room.game) {
    await rooms.dehydrate(room)
  } else if (no_users_left && !room.game) {
    room.users.forEach(inuser => {
      let user = users.get(inuser.id)
      if (user) {
        user.left_room(room.id)
      }
    });
    rooms.remove(room)
    delete room
  }
}

module.exports = on_disconnect