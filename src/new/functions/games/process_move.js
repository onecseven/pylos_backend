const rooms = require("../../data/rooms")
const messages = require("../../messages")

const process_pylos_move = (user, data) => {
  let id = data.gameId
  let move = data.move

  let room = rooms[id]
  let game = room.game

  let current_player = game.serial_state.current_player
  let sender_turn_num = room.users.indexOf(user)
  let move_player = move.player
  let checks = (move_player === sender_turn_num &&
    move_player === current_player &&
    current_player === sender_turn_num)

  if (checks) {
    let result = game.send_move(move)
    if (result === true) {
      room.sendDataToEveryone(messages.GAME_STATE(game.serial_state))
      if (game.serial_state.game_status.game_status === "FINISHED") {
        room.sendDataToEveryone(
          messages.GAME_END(game.serial_state.game_status.winner)
        )
      }
    } else if (result === false) {
      room.sendDataToEveryone(messages.MOVE_FAILED(game.serial_state.errors))
    }
  } else if (move_player !== sender_turn_num) {
    room.sendDataToEveryone(messages.MOVE_FAILED("wrong player sent move"))
  }
}

module.exports = process_pylos_move