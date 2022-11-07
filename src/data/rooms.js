const englishWordGen = require("../functions/helpers/wordGen")
const storage = require("./storage").init()
const deserialize_move_list = require("../functions/games/deserialize_move_list")
class Room {
  id = englishWordGen()[0]
  users = []
  maxUsers = 2
  game = null

  constructor() {}

  join(user) {
    if (
      this.maxUsers > this.users.length &&
      this.game === null &&
      this.users.includes(user) === false
    ) {
      this.users.push(user)
      return true
    } else {
      return false
    }
  }

  isHost(user) {
    return this.users.indexOf(user) == 0
  }

  hasUser(user) {
    return this.users.indexOf(user) !== -1
  }

  getHost() {
    return this.users[0]
  }

  serialize() {
    return {
      id: this.id,
      users: this.users.map((user) => user.serialize()),
      maxUsers: this.maxUsers,
      game: this.game ? this.game.serial_state.move_history : null,
    }
  }

  static deserialize(serializedRoom) {
    let temp = new Room()
    
    if (serializedRoom.game) {
      let temp_game = deserialize_move_list(serializedRoom.game)
      serializedRoom.game = temp_game
    }
    Object.assign(temp, serializedRoom)
    return temp
  }
}

class Rooms {
  rooms = new Map()

  get(id) {
    if (this.rooms.has(id)) return this.rooms.get(id)
    return null
  }

  create() {
    let room = new Room()
    this.add(room)
    return room
  }

  add(room) {
    this.rooms.set(room.id, room)
  }
}

let singleton = new Rooms()

module.exports = singleton
