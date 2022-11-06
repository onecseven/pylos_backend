const rooms = require("../../data/rooms")
const messages = require("../messages")
const send_data_to_everyone = require("../switchboard/send_to_everyone")
const wincon_check = require("./wincon_check")

let distribute_state = (state, roomId) => send_data_to_everyone(messages.GAME_STATE(state), roomId)
let failed_move = (error, roomId) => send_data_to_everyone(messages.MOVE_FAILED(state), roomId)


const process_pylos_move = (user, data) => {
  let id = data.gameId
  let move = data.move

  let room = rooms.get
  let game = room.game

  let current_player = game.serial_state.current_player
  let sender_turn_num = room.users.indexOf(user)
  let move_player = move.player
  
  let checks = (move_player === sender_turn_num &&
    move_player === current_player &&
    current_player === sender_turn_num)

  if (checks) {
    let move_success = game.send_move(move)
    if (move_success) {
      distribute_state(game.serial_state, id)
      wincon_check(room)
    } else {
      failed_move(game.serial_state.errors, id)
    }
  } else {
    failed_move("wrong player sent move", id)
  }
}

module.exports = process_pylos_move