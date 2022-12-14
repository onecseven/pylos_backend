const join_room = require("./room/join_room")
const create_room = require("./room/create_room")
const user_wants_rematch = require("./room/user_wants_rematch")
// const leave_room = require("./room/leave_room")
const rejoin = require("./room/rejoin")

const start_pylos = require("./games/start_pylos")
const process_move = require("./games/process_move")

const name_change = require("./user/name_change")
const get_rooms = require("./user/get_rooms")
// const create_user = require("./user/create_user")
const remove_user = require("./user/user_disconnected")
const login = require("./user/login")
// const login = require("./user/login")

module.exports = {
  room: {
    join_room, //tested, partial complete
    create_room, //tested, complete
    //   leave_room, // turned off
    user_wants_rematch, //tested, partial complete (needs games tow ork)
    rejoin, // confirmed working
  },
  user: {
    name_change, // done
    get_rooms, // working
    // create_user, //todo
    remove_user, //todo
    login, // working
  },
  game: {
    start_pylos, //confirmed working
    process_move, //confirmed working working
  },
}
