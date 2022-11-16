const { create_pylos_game } = require("../functions/games/pylos/clones/pylos/blueprint")
const rooms_db = require("./room")

class Switchboard {
  /* id: {
    connection: ws,
  } */
  users = new Map()
  games = new Map()
  get(id) {
    if (this.users.has(id)) {
      return this.users.get(id)
    } else {
      return null
    }
  }

  add(id, connection) {
    this.users.set(id, connection)
  }

  remove(id) {
    this.users.delete(id)
  }

  async get_game(id, options = { rehydrate: false }) {
    if (this.games.has(id)) return this.games.get(id)
    if (options.rehydrate) {
      await rooms_db
        .get_room_by_id(id)
        .then((room) => { 
          let new_game = create_pylos_game()
          for (let move of JSON.parse(room.game)) {
            new_game.send_move(move)
          }
          switchboard.add_game(room_id, new_game)
        })
        .catch((e) => console.log("Game in no room?=", e))
      return this.games.get(id)
    }
    return null
  }
  /**
   * also serves as update
   * @param {string} id
   * @param {GSM} GSM
   */
  add_game(id, GSM) {
    this.games.set(id, GSM)
  }

  remove_game(id) {
    this.games.delete(id)
  }
}

let singleton = new Switchboard()

module.exports = singleton
