const {room, user, game} = require("./functions/index")

let cases = {
  "my name is": user.name_change,
  // "join room": room.join_room,
  // "create room": room.create_room,
  // "leave room": room.leave_room,
  // "start pylos game": game.start_pylos,
  // "pylos move": game.process_move,
  // "user wants rematch": room.user_wants_rematch,
  "my rooms": user.get_rooms,
  // "login": user.login,
  // "rejoin": room.rejoin
}

const router = async (user, data) => {
  let { message } = data
  if (cases.hasOwnProperty(message)) {
    await cases[message](user, data)
  }
}

module.exports = router