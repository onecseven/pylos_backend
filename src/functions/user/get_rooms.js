const { user } = require("..")
const switchboard = require("../../data/Switchboard")
const users = require("../../data/users")
const rooms = require("../../data/rooms")
const send_data = require("../switchboard/send_to_user")
const messages = require("../messages")

// change this to switch board
const get_rooms =  (user)  => {
  if (user.rooms.length) {
    let user_rooms = user.rooms
    .map(id => rooms.get(id))
    .filter(room => room !== null)
    send_data(messages.YOUR_ROOMS(user_rooms), user.id)
    return user_rooms 
  }
}   

module.exports = get_rooms