const switchboard = require("../../data/Switchboard")
const users_db = require("../../data/user")
const rooms_db = require("../../data/room")

const send_data = require("../switchboard/send_to_user")
const messages = require("../messages")

// we want room.users and room.id
const get_rooms = async (user) => {
  let user_rooms = await users_db.get_rooms_user_is_in(user.id)
  let result = []
  if (user_rooms) {
    for (let room_id of user_rooms) {
      let users = await rooms_db.get_users_on_room(room_id)
      if (users) result.push({ id: room_id, users })
    }
    send_data(messages.YOUR_ROOMS(result), user.id)
  } else send_data(messages.YOUR_ROOMS([]), user.id)
}

module.exports = get_rooms
