const rooms = require("../../data/rooms")
const { create_pylos_game } = require("./pylos/clones/pylos/blueprint")
const messages = require("../../messages")

const start_pylos = (user, data) => {
  let id = data.gameId

  if (!rooms.HasOwnProperty(id)){
    console.error("Trying to start pylos on an inexistent room.")
    return
  }

  if (rooms[id].users.length !== 2) {
    user.sendData(messages.GAME_START_FAIL("not enough players"))
    return
  }

  if (rooms[id].isHost(user)) {
    let room = rooms[id]
    room.started = true
    room.sendDataToEveryone(messages.GAME_STARTED(id))
    room.users.forEach((user, i) => {
      user.sendData(messages.GIVE_TURN_ORDER(i))
    })
    room.game = create_pylos_game()
    room.sendDataToEveryone(messages.GAME_STATE(room.game.game.serial_state))
  }
}

module.exports = start_pylos