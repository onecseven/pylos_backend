const englishWordGen = require("../functions/helpers/wordGen")
const deserialize_move_list = require("../functions/games/deserialize_move_list")
class Room {
  id = englishWordGen()[0]
  users = []
  maxUsers = 2
  game = null

  constructor() {}

  join(user) {
    if (this.users.map((u) => u.id).includes(user.id)) {
      this.connected(user.id)
      return true
    } 
    if (this.maxUsers > this.users.length && this.game === null) {
      this.users.push({
        id: user.id,
        name: user.name,
        rematch: false,
        connected: true,
      })
      return true
    }
    return false
  }

  wants_rematch(id) {
    this.users.find(user => user.id === id).rematch === true
  }

  clear_rematch() {
    this.users.forEach(user => {
      user.rematch = false
    })
  }

  exit(userid) {
    this.users = this.users.filter((user) => user.id !== userid)
  }

  disconnected(userid) {
    let user = this.users.find((user) => user.id === userid)
    user.connected = false
  }

  connected(userid) {
    let user = this.users.find((user) => user.id === userid)
    user.connected = true
  }

  isHost(userid) {
    return this.users[0].id === userid
  }

  hasUser(userid) {
    return this.users.map((user) => user.id).includes(userid)
  }

  getHost() {
    return this.users[0]
  }

  serialize() {
    return {
      id: this.id,
      users: this.users,
      maxUsers: this.maxUsers,
      game: this.game?.serial_state?.move_history
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

  remove(room) {
    this.rooms.delete(room.id)
  }

  async stored_lookup(roomid) {
    let keys = await storage.keys()
    if (keys.includes(roomid)){
      return await this.rehydrate(roomid)
    } else {
      return null
    }
  }

  async dehydrate(room) {
    console.log("Dehydrating room: " + room.id)
    await storage.setItem(room.id, room.serialize())
    this.remove(room)
  }

  async rehydrate(roomid) {
    console.log("Rehydrating room: " + roomid)
    let temp = await storage.getItem(roomid)
    let room = Room.deserialize(temp)
    this.add(room)
    return room
  }
}

let singleton = new Rooms()

module.exports = singleton
