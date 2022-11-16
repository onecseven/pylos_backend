const rooms_db = require("../../data/room")
const users_db = require("../../data/user")
const save_user = require("../user/save_user")
const englishWordGen = require("../helpers/wordGen")
const messages = require("../messages")
const send_data = require("../switchboard/send_to_user")

const create_room = async (user) => {
  let user_exists = await users_db.get_user_by_id(user.id)
  if (!user_exists) await save_user(user)
  await rooms_db
    .create_room({
      room_id: englishWordGen()[0],
      host: user.id,
    })
    .then(async (room) => {
      await rooms_db.get_room_with_users(room.room_id).then((room) => {
        send_data(
          messages.JOINED_ROOM(room.room_id, room.users, room.host),
          user.id
        )
      })
    })
    .catch(e => console.log("Create room error ->", e))
}

module.exports = create_room
