const rooms_db = require("../../data/room")
const { create_pylos_game } = require("./pylos/clones/pylos/blueprint")
const messages = require("../messages")
const send_data = require("../switchboard/send_to_user")
const send_to_room = require("../switchboard/send_to_everyone")
const switchboard = require("../../data/Switchboard")

const not_enough = async (user) =>
  send_data(messages.GAME_START_FAIL("not enough players"), user.id)
const game_started = (id) => send_to_room(messages.GAME_STARTED(id), id)
const send_turn = (userid, turn_id) =>
  send_data(messages.GIVE_TURN_ORDER(turn_id), userid)
const distribute_state = (state, roomId) =>
  send_to_room(messages.GAME_STATE(state), roomId)

const start_pylos = async (user, data) => {
  let room_id = data.gameId
  let room = await rooms_db.get_room_with_users(room_id)

  if (!room) {
    return console.error(
      "Trying to start pylos on an inexistent room (",
      + room_id + ")."
    )
  } else if (room.users.length < 2) {
    return not_enough(user)
  } else if (room.host !== user.id) {
    return console.error("Not host trying to start game.")
  }
  
  game_started(room_id)
  room.users.forEach((user, i) => send_turn(user.user_id, i))
  room.update({ game: "[]" })
  room.save()
  switchboard.add_game(room_id, create_pylos_game())
  let game = switchboard.get_game(room_id)
  distribute_state(game.serial_state, room_id)
}

module.exports = start_pylos
