const rooms_db = require("../../data/room")
const users_db = require("../../data/user")
const messages = require("../messages")
const send_data = require("../switchboard/send_to_user")
const send_to_room = require("../switchboard/send_to_everyone")
const rejoin = require("../room/rejoin")
const db = require("../../data/db/db")
const save_user = require("../user/save_user")

let full_room = (id) =>
  send_data(messages.FAILED_TO_JOIN_ROOM("room is full"), id)
let room_started = (id) =>
  send_data(messages.FAILED_TO_JOIN_ROOM("room is in game"), id)
let already_in = (id) =>
  send_data(messages.FAILED_TO_JOIN_ROOM("already inside this room"), id)
let wrong_code = (id) =>
  send_data(messages.FAILED_TO_JOIN_ROOM("wrong code"), id)

let you_joined = (room, id) =>
  send_data(messages.JOINED_ROOM(room.id, room.users, room.host), id)

let someone_joined = (room, user) =>
  send_to_room(messages.USER_JOINED(room.id, user), room.id)

const join_room = async (user, data) => {
  let user_exists = await users_db.get_user_by_id(user.id)
  if (!user_exists) await save_user(user)
  let { roomId } = data
  let room = await rooms_db.get_room_with_users(roomId)
  if (room) {
    if (room.users.map(user => user.user_id).includes(user.id) && room.game?.length) await rejoin(user, data) //need test
    else if (room.users.length >= room.max_users) full_room(user.id) 
    else if (!room.game) { //working
      await rooms_db.add_user_to_room(roomId, user.id)
      room = await rooms_db.get_room_with_users(roomId)
      console.log(JSON.stringify(room.users, null, 2))
      you_joined(
        { id: room.room_id, users: room.users, host: room.host },
        user.id
      )
      someone_joined({ user_id: room.room_id }, user)
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
