const rooms = require("../../data/rooms")
const { create_pylos_game } = require("./pylos/clones/pylos/blueprint")
const messages = require("../messages")
const send_data = require("../switchboard/send_to_user")
const send_to_room = require("../switchboard/send_to_everyone")

const not_enough = (user) =>
  send_data(messages.GAME_START_FAIL("not enough players"), user.id)
const game_started = (id) => send_to_room(messages.GAME_STARTED(id), id)
const send_turn = (user, turn_id) =>
  send_data(messages.GIVE_TURN_ORDER(turn_id), user.id)
const distribute_state = (state, roomId) => send_data_to_everyone(messages.GAME_STATE(state), roomId)

const start_pylos = (user, data) => {
  let id = data.gameId
  let room = rooms.get(id)
  if (room) {
    console.error("Trying to start pylos on an inexistent room.")
    return
  }

  if (room.users.length !== 2) {
    not_enough(user)
    return
  }

  if (room.isHost(user)) {
    game_started(room.id)
    room.users.forEach((user, i) => send_turn(user, i))
    room.game = create_pylos_game()
    distribute_state(room.game.serial_state, id)
  }
}

module.exports = start_pylos
