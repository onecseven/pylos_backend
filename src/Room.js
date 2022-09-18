/**
 * Copyright 2020 Anicet Nougaret & contributors
 * See LICENCE.txt
 */

const englishWordGen = require("./wordGen")
const messages = require("./messages")
const { create_pylos_game } = require("./pylos/clones/pylos/blueprint")

class Room {
  id = englishWordGen()[0]
  users = []
  usersStates = {}
  maxUsers = 1024
  started = false
  game = {}

  constructor() {}

  sendDataToEveryone(data) {
    this.users.forEach((u) => u.sendData(data))
  }

  join(user) {
    if (this.users.indexOf(user) != -1) return false
    this.users.push(user)
    this.usersStates[user.id] = {}
    user.sendData(messages.JOINED_ROOM(this.id, this.getUsersND(), this.getHost().id))
    this.sendDataToEveryone(messages.USER_JOINED(this.id, this.getUserND(user)))
    return true
  }

  onUserLeft(user) {
    this.sendDataToEveryone(messages.USER_LEFT(this.id, user.id))
    this.users.splice(this.users.indexOf(user), 1)
  }

  onStart(game) {
    switch (game) {
      case "pylos":
        this.started = true
        this.sendDataToEveryone(messages.GAME_STARTED(this.id))
        this.users.forEach((user, i) => {
          user.sendData(messages.GIVE_TURN_ORDER(i))
        })
        this.game = create_pylos_game()
        this.sendDataToEveryone(messages.GAME_STATE(this.game.serial_state))
    }
  }

  onDeleted() {
    this.sendDataToEveryone(messages.ROOM_DELETED(this.id))
    this.users.forEach((u) => delete u.rooms[this.id])
  }

  getUsersND() {
    return this.users.map((u) => this.getUserND(u))
  }

  getUserND(user) {
    return { ...user.toNetworkData() /*, ...this.usersStates[user.id]*/ }
  }

  isHost(user) {
    return this.users.indexOf(user) == 0
  }

  getHost() {
    return this.users[0]
  }
}

module.exports = Room
