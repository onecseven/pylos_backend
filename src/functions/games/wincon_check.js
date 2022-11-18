const rooms_db = require("../../data/room")
const messages = require("../messages")
const send_to_room = require("../switchboard/send_to_everyone")

let declare_winner = (winner, roomId) =>
  send_to_room(messages.GAME_END(winner), roomId)

const wincon_check = async (game, room_id) => {
  if (game.game_status.game_status === "FINISHED") {
    declare_winner(game.game_status.winner, room_id)
    await rooms_db.delete_game_in_room(room_id)
  }
}

module.exports = wincon_check
