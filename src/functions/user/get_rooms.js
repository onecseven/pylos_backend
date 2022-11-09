const { user } = require("..")
const switchboard = require("../../data/Switchboard")
const users = require("../../data/users")
const rooms = require("../../data/rooms")
const send_data = require("../switchboard/send_to_user")
const messages = require("../messages")

// change this to switch board
const get_rooms =  async (user)  => {
  if (user.rooms.length) {
    let filtered = []
    for (let id of user.rooms) {
      let room = rooms.get(id)
      if (!room) {
        room = await rooms.stored_lookup(id)
      }
      if (room) {
        filtered.push(room)
      }
    }
    user.rooms = filtered.map(room => room.id)
    send_data(messages.YOUR_ROOMS(filtered), user.id)
    return user.rooms 
  }
}   

module.exports = get_rooms