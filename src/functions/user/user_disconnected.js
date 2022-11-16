const switchboard = require("../../data/Switchboard")
// const on_disconnect = require("../room/on_disconnect")

const user_disconnected = async (user, code) => {
  switchboard.remove(user.id)
  delete user
  //TODO gotta move all this shit
  // if (user.rooms.length) {
  //   user.rooms.forEach(async (roomid) => {
  //     let room = rooms.get(roomid)
  //     if (room) {
  //       await on_disconnect(user, room)
  //     }
  //   })
  //   let filtered = user.rooms
  //     .map((id) => rooms.get(id))
  //     .filter((room) => room !== null)
  //     .filter((room) => room.game !== null)
  //     .map((room) => room.id)
  //   user.rooms = filtered

  //   if (user.rooms.length) {
  //     await users.save_user(user.id)
  //     users.remove(user.id)
  //   } 
  // }
}

module.exports = user_disconnected
