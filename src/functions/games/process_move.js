const rooms_db = require("../../data/room")
const switchboard = require("../../data/Switchboard")
const messages = require("../messages")
const send_data_to_everyone = require("../switchboard/send_to_everyone")
const send_data = require("../switchboard/send_to_user")
const { create_pylos_game } = require("./pylos/clones/pylos/blueprint")
const wincon_check = require("./wincon_check")

let distribute_state = (state, roomId) =>
  send_data_to_everyone(messages.GAME_STATE(state), roomId)
let failed_move = (error, roomId) =>
  send_data_to_everyone(messages.MOVE_FAILED(error), roomId)
let error = (error, user_id) => send_data(messages.ERROR(error), user_id)

const process_pylos_move = async (user, data) => {
  let room_id = data.gameId
  let move = data.move
  let game = await switchboard.get_game(room_id, { rehydrate: true })
  let room = await rooms_db.get_room_with_users(room_id)

  if (!room) return console.error("Move on non-room")

  let current_player = game.serial_state.current_player
  let sender_turn_num = await room.users.indexOf(user.id)
  let move_player = move.player

  let checks =
    move_player === sender_turn_num &&
    move_player === current_player &&
    current_player === sender_turn_num

  if (checks) {
    await rooms_db.update_game_in_room(room_id, move)
    let move_success = game.send_move(move)
    if (move_success) {
      distribute_state(game.serial_state, room_id)
      wincon_check(room)
    } else {
      failed_move(game.serial_state.errors, room_id)
    }
  } else {
    failed_move("wrong player sent move", room_id)
  }
}

module.exports = process_pylos_move
