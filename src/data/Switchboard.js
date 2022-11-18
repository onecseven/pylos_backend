const {
  create_pylos_game,
} = require("../functions/games/pylos/clones/pylos/blueprint")
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

  get_active_users() {
    return [...this.users.keys()]
  }
  /**
   *
   * @param {string} room_id
   * @param {object} options
   * @returns {GSM}
   */
  async get_game(room_id, options = { rehydrate: false }) {
    if (this.games.has(room_id)) return this.games.get(room_id)
    if (options.rehydrate) {
      await rooms_db
        .get_room_by_id(room_id)
        .then((room) => {
          let new_game = create_pylos_game()
          for (let move of JSON.parse(room.game)) {
            new_game.send_move(move)
          }
          this.add_game(room_id, new_game)
        })
        .catch((e) => console.log("Game in no room?=", e))
      return this.games.get(room_id)
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

  get_active_rooms() {
    return [...this.games.keys()]
  }

  remove_game(id) {
    this.games.delete(id)
  }

  flush_if_empty(rooms_array) {
    let active_users = this.get_active_users()
    let active_rooms = this.get_active_rooms()

    let active_rooms_from_user = rooms_array.filter(room => active_rooms.includes(room.room_id))
    
    active_rooms_from_user.forEach(room => {
      let all_users_disconnected = room.users.every(user => !active_users.includes(user.user_id))
      if (all_users_disconnected) {
        console.log("Removing inactive room: " + room.room_id)
        this.remove_game(room.room_id)
      }
    })
  }
}

let singleton = new Switchboard()

module.exports = singleton
