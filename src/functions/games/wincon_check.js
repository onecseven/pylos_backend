const messages = require("../messages")
const send_to_room = require("../switchboard/send_to_everyone")

let declare_winner = (winner, roomId) =>
  send_to_room(messages.GAME_END(winner), roomId)

const wincon_check = (game, room_id) => {
  if (game.game_status === "FINISHED") {
    declare_winner(current.winner, room_id)
    room.game = null
    //game ended function
    //save old moves
    //destroy room.game
  }
}

module.exports = wincon_check