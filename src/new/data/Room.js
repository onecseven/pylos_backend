const englishWordGen = require("../functions/helpers/wordGen")
const messages = require("../functions/messages")

class Room {
  id = englishWordGen()[0]
  users = []
  maxUsers = 4
  started = false
  game = {}

  constructor() {
  }

  sendDataToEveryone(data) {
    this.users.forEach((u) => u.sendData(data))
  }

  join(user) {
    if (this.users.indexOf(user) != -1) return false
    this.users.push(user)
    user.sendData(messages.JOINED_ROOM(this.id, this.users.map(user => user.serialize()), this.getHost().id))
    this.sendDataToEveryone(messages.USER_JOINED(this.id, this.getUserND(user)))
    return true
  }

  onUserLeft(user) {
    this.sendDataToEveryone(messages.USER_LEFT(this.id, user.id))
    this.users.splice(this.users.indexOf(user), 1)
  }

  onDeleted() {
    this.sendDataToEveryone(messages.ROOM_DELETED(this.id))
    this.users.forEach((u) => delete u.rooms[this.id])
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
}

module.exports = Room
