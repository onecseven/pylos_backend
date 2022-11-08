const name_change = require("./user/name_change")
const join_room = require("./room/join_room")
const create_room = require("./room/create_room")
const leave_room = require("./room/leave_room")
const start_pylos = require("./games/start_pylos")
const process_move = require("./games/process_move")
const user_wants_rematch = require("./room/user_wants_rematch")
const get_rooms = require("./user/get_rooms")
// const create_user = require("./user/create_user")
const remove_user = require("./user/user_disconnected")
const login = require("./user/login")
const rejoin = require("./room/rejoin")

module.exports = {
  room: {
    join_room,
    create_room,
    leave_room,
    user_wants_rematch,
    rejoin
  },
  user: {
    name_change,
    get_rooms,
    // create_user,
    remove_user,
    login
  },
  game: {
    start_pylos,
    process_move,
  }
}