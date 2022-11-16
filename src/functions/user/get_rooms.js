const switchboard = require("../../data/Switchboard")
const users_db = require("../../data/user")
const rooms_db = require("../../data/room")

const send_data = require("../switchboard/send_to_user")
const messages = require("../messages")

// we want room.users and room.id
const get_rooms = async (user) => {
  let actual_user = await rooms_db.get_user_with_rooms_with_users(user.id)
   if (actual_user && actual_user.rooms.length) {
    send_data(messages.YOUR_ROOMS(actual_user.rooms), user.id)
  } else send_data(messages.YOUR_ROOMS([]), user.id)
}

module.exports = get_rooms
