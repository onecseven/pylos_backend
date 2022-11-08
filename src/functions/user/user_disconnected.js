const switchboard = require("../../data/Switchboard")
const users = require("../../data/users")
const rooms = require("../../data/rooms")
const on_disconnect = require("../room/on_disconnect")

// change this to switch board
const user_disconnected = async (user, code)  => {
  switchboard.remove(user.id)

  if (user.rooms.length) {
    user.rooms.forEach(async roomid => {
      let room = rooms.get(roomid)
      if (room) {
        await on_disconnect(user, room)
      }
    })
    let filtered = user.rooms
    .map(id => rooms.get(id))
    .filter(room => room !== null)
    .filter(room => room.game !== null)
    .map(room => room.id)
    user.rooms = filtered
  }

  await users.log_out(user.id)

}   

module.exports = user_disconnected