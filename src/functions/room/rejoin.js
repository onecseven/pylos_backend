const rooms_db = require("../../data/room")
const messages = require("../messages")
const send_data = require("../switchboard/send_to_user")
const switchboard = require("../../data/Switchboard")

const rejoin = async (user, data) => { //working
  let { roomId } = data
  let room = await rooms_db.get_room_with_users(roomId)
  
  if (!room) {
    return null //message?
  }

  if (room.users.find(iser => iser.user_id === user.id)) {
    let game = await switchboard.get_game(roomId, { rehydrate: true })
    if (!game)
      return console.error(
        "Trying tor reenter a room with no game",
        JSON.stringify(data, null, 2)
      )
    send_data(
      messages.JOINED_ROOM(room.room_id, room.users, room.host),
      user.id
    )
    send_data(messages.GAME_STARTED(room.room_id), user.id)
    room.users.forEach((u, i) => {
      if (u.user_id === user.id) {
        send_data(messages.GIVE_TURN_ORDER(i), user.id)
      }
    })
    send_data(messages.GAME_STATE(game.serial_state), user.id)
  }
}

module.exports = rejoin
