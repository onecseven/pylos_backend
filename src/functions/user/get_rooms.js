const switchboard = require("../../data/Switchboard")
const users_db = require("../../data/user")
const send_data = require("../switchboard/send_to_user")
const messages = require("../messages")

const get_rooms = async (user) => {
  let user_rooms = users_db.get_rooms_user_is_in(user.id)
  if (user_rooms) send_data(messages.YOUR_ROOMS(filtered), user.id)
  else send_data(messages.YOUR_ROOMS([]), user.id)
}

module.exports = get_rooms
