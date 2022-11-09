const { create_pylos_game } = require("./pylos/clones/pylos/blueprint")

const deserialize_move_list = (move_list) => {
  let game = create_pylos_game()
  for (let move of move_list) {
    game.send_move(move)
  }
  return game
}

module.exports = deserialize_move_list