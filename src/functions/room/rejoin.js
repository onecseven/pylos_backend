const { rooms } = require("../../data/rooms")
const messages = require("../messages")
const send_data = require("../switchboard/send_to_user")
const send_to_room = require("../switchboard/send_to_everyone")

const rejoin = async (user, data) => {
  let { roomId } = data
  let room = rooms.get(roomId)
  
  if (!room) {
    let storage = await rooms.stored_lookup(roomid)
    if (storage) room = storage
    else return
  }

  if (room && room?.hasUser(user.id) && room?.join(user)) {
    room.users.forEach((u, i) => {
      if (u.id === user.id) {
        send_data(messages.GIVE_TURN_ORDER(i), user.id)
      }
    })
    send_data(messages.GAME_STATE(room.game.serial_state), user.id)
  }
}

module.exports = rejoin
