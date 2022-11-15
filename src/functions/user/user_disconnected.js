const switchboard = require("../../data/Switchboard")
const users = require("../../data/users.old")
const rooms = require("../../data/rooms.old")
const on_disconnect = require("../room/on_disconnect")

const user_disconnected = async (user, code) => {
  switchboard.remove(user.id)

  if (user.rooms.length) {
    user.rooms.forEach(async (roomid) => {
      let room = rooms.get(roomid)
      if (room) {
        await on_disconnect(user, room)
      }
    })
    let filtered = user.rooms
      .map((id) => rooms.get(id))
      .filter((room) => room !== null)
      .filter((room) => room.game !== null)
      .map((room) => room.id)
    user.rooms = filtered
    if (user.rooms.length) {
      await users.save_user(user.id)
      users.remove(user.id)
    } 
  }
}

module.exports = user_disconnected
