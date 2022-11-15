const rooms_db = require("../../data/room")
const users_db = require("../../data/user")
const save_user = require("../user/save_user")
const englishWordGen = require("../helpers/wordGen")
const messages = require("../messages")
const send_data = require("../switchboard/send_to_user")

const create_room = async (user) => {
  let user_exists = await users_db.get_user_by_id(user.id)
  if (!user_exists) await save_user(user)
  let room = await rooms_db.create_room({
    room_id: englishWordGen()[0],
    host: user.id,
  })
  if (room) {
    send_data(
      messages.JOINED_ROOM(room.room_id, [room.host], room.host),
      user.id
    )
  }
}

module.exports = create_room
