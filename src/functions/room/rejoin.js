const rooms_db = require("../../data/room")
const messages = require("../messages")
const send_data = require("../switchboard/send_to_user")

const rejoin = async (user, data) => {
  let { roomId } = data
  let room = await rooms_db.get_room_by_id(roomId)

  if (!room) {
    return null //message?
  }

  if (room?.hasUser(user.id)) {
    let users = await rooms_db.get_users_on_room(roomId)
    if (!users) {
      return null //message?
    }

    send_data(messages.JOINED_ROOM(room.room_id, users, room.host), user.id)
    send_data(messages.GAME_STARTED(room.id), user.id)
    users.forEach((u, i) => {
      if (u === user.id) {
        send_data(messages.GIVE_TURN_ORDER(i), user.id)
      }
    })
    send_data(messages.GAME_STATE(room.game.serial_state), user.id)
  }
}

module.exports = rejoin
