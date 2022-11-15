const rooms_db = require("../../data/room")
const save_user = require("../user/save_user")
const join_room = require("./join_room")
const englishWordGen = require("../helpers/wordGen")


const create_room = async (user) => {
  await save_user(user)
  let room = await rooms_db.create_room({
    room_id: englishWordGen()[0],
    host: user.id,
  })
  join_room(user, { roomId: room.id })
}

module.exports = create_room
