const rooms_db = require("../../data/room")
const messages = require("../messages")
const send_data = require("../switchboard/send_to_user")
const send_to_room = require("../switchboard/send_to_everyone")
const rejoin = require("../room/rejoin")
const db = require("../../data/db/db")

let full_room = (id) => send_data(messages.FAILED_TO_JOIN_ROOM("room is full"), id)
let room_started = (id) => send_data(messages.FAILED_TO_JOIN_ROOM("room is in game"), id)
let already_in = (id) => send_data(messages.FAILED_TO_JOIN_ROOM("already inside this room"), id)
let wrong_code = (id) => send_data(messages.FAILED_TO_JOIN_ROOM("wrong code"), id)
let you_joined = (room, user) => send_data(messages.JOINED_ROOM(room.id, room.users, room.host), user.id)
let someone_joined = (room, user) => send_to_room(messages.USER_JOINED(room.id, user), room.id)

const join_room = async (user, data) => {
  let { roomId } = data
  let room = await rooms_db.get_room_by_id(roomId)
  if (room) {
    let users_in_room = await rooms_db.get_users_on_room(roomId)
    if (users_in_room.includes(user.id) && room.game) await rejoin(user, data)
    else if (!users_in_room.includes(user.id) && room.game) room_started(user.id)
    else if (users_in_room.length >= room.max_users) full_room(user.id)
    else if (!room.game) {
      await rooms_db.add_user_to_room(roomId, user.id)
      you_joined({id: room.room_id, users: users_in_room, host: room.host}, user.id)
      someone_joined({id: room_id}, user)
      return
    }
  }
  // if (room && room.game && room.hasUser(user.id)) await rejoin(user, data)
  // else if (room.users.length >= room.maxUsers) full_room(user.id)
  // else if (room) {
  //   let user_has_joined = room.join(user)
  //   if (user_has_joined) {
  //     user.has_joined_room(room.id)
  //     you_joined(room, user)
  //     someone_joined(room, user)
  //   } 
  // } 
  // else wrong_code(user.id)
}

module.exports = join_room
