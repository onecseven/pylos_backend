/**
 * Copyright 2020 Anicet Nougaret & contributors
 * See LICENCE.txt
 */

const Room = require("./Room")
const messages = require("./messages")

class RoomsManager {
  rooms = {}
  handleMessage(data, sender) {
    switch (data.message) {
      case "create room":
        this.createRoom(sender)
        break
      case "join room":
        this.joinRoom(sender, data.gameId)
        break
      case "leave room":
        this.leaveRoom(sender, data.gameId)
        break
      case "start pylos game":
        this.startPylosGame(sender, data.gameId)
        break
      case "pylos move":
        this.process_pylos_move(sender, data.gameId, data.move)
        break
      case "user wants rematch":
        this.onRematch(sender, data.gameId)
        break
      case "send host":
        this.sendHost(sender, data.gameId)
        break
    }
  }

  joinRoom(user, roomId) {
    let room = this.rooms[roomId]
    if (!room) {
      user.sendData(messages.FAILED_TO_JOIN_ROOM("wrong code"))
    } else if (room.users.length >= room.maxUsers) {
      user.sendData(messages.FAILED_TO_JOIN_ROOM("room is full"))
    } else if (room.started) {
      user.sendData(messages.FAILED_TO_JOIN_ROOM("room is in game"))
    } else if (room.users.indexOf(user) != -1) {
      user.sendData(messages.FAILED_TO_JOIN_ROOM("already inside this room"))
    } else if (!user.joinRoom(room)) {
      //why is the connection happening in an if statement lmao
      user.sendData(messages.FAILED_TO_JOIN_ROOM("something went wrong"))
    }
  }

  leaveRoom(user, id) {
    if (this.rooms[id] && user.rooms[id]) {
      let room = user.rooms[id]
      room.onUserLeft(user)
      if (room.users.length <= 0) {
        this.removeRoom(room)
      }
    }
  }

  onRematch(user, id) {
    if (this.rooms[id] && user.rooms[id]) {
      user.rematch = true
    }

    if (this.rooms[id].users.every((user) => user.rematch === true)) {
      this.rooms[id].users.every(user => user.rematch = false)
      this.rooms[id].onStart("pylos")
    } else {
      this.rooms[id].sendDataToEveryone(messages.REMATCH_OFFERED(user))
    }

  }

  createRoom(host) {
    let room = new Room(host)
    this.rooms[room.id] = room
    let permitted = host.joinRoom(room)
    if (!permitted) this.removeRoom(room)
  }

  removeRoom(room) {
    room.onDeleted()
    delete this.rooms[room.id]
  }

  startPylosGame(user, id) {
    if (this.rooms[id].users.length !== 2) {
      user.sendData(messages.GAME_START_FAIL("not enough players"))
      return
    }
    if (
      this.rooms[id] &&
      user.rooms[id] &&
      this.rooms[id].isHost(user) &&
      !this.rooms[id].started
    ) {
      this.rooms[id].onStart("pylos")
    }
  }

  sendHost(sender, id) {
    if (this.rooms[id]) {
      sender.sendData(messages.UPDATE_HOST(id, this.rooms[id].getHost().id))
    }
  }

  process_pylos_move(user, id, move) {
    let room = this.rooms[id]
    let game = room.game
    let current_player = game.serial_state.current_player
    let sender_turn_num = room.users.indexOf(user)
    let move_player = move.player
    if (
      move_player === sender_turn_num &&
      move_player === current_player &&
      current_player === sender_turn_num
    ) {
      if (game.send_move(move)) {
        room.sendDataToEveryone(messages.GAME_STATE(game.serial_state))
        if (game.serial_state.game_status.game_status === "FINISHED") {
          room.sendDataToEveryone(messages.GAME_END(game.serial_state.game_status.winner))
        }
      } else {
        room.sendDataToEveryone(messages.MOVE_FAILED(game.serial_state.errors))
      }
    } else {
      room.sendDataToEveryone(messages.MOVE_FAILED("wrong player sent move"))
    }
  }

}

let singleton = new RoomsManager()

module.exports = singleton
