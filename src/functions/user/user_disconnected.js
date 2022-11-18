const switchboard = require("../../data/Switchboard")
const rooms_db = require("../../data/room")
// const on_disconnect = require("../room/on_disconnect")

const user_disconnected = async (user, code) => {
  switchboard.remove(user.id)
  delete user
  let db_user = await rooms_db.get_user_with_rooms_with_users(user.user_id)
  let rooms_to_delete = []
  let rooms_to_check_further = []

  db_user.rooms.forEach((room) => {
    let room_size = room.users.length
    if (room_size !== 2 || room.game === null)
      rooms_to_delete.push(room.room_id)
    if (room_size === 2 && room.game !== null)
      rooms_to_check_further.push(room)
  })

  await rooms_db.flush_rooms(rooms_to_delete)
  switchboard.flush_if_empty(rooms_to_check_further)
}

module.exports = user_disconnected
