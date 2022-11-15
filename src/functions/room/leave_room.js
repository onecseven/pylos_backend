const { removeItem } = require("node-persist")
const rooms = require("../../data/rooms")
const messages = require("../messages")
const send_to_room = require("../switchboard/send_to_everyone")

const leave_room = (user, data) => {
  // let id = data.roomId
  // let room = rooms.get(id)
  
  // if (!room) {
  //   console.error("No such room")
  //   return
  // }
  
  // if (!room.hasUser(user.id)){
  //   console.error("Someone tried to leave a room they're not in")
  // }

  // if (!room.game) {
  //   send_to_room(messages.USER_LEFT(id, user.id), room.id)
  //   room.exit(user.id)
  //   if (room.users.length === 0) rooms.remove(room)
  //   //delete rooms[id]
  //   //delete from persist
  // } else if (room.game) {
  //   room.disconnected(user.id)
  //   //TODO
  //   //PERSIST ROOM
  // }
}

module.exports = leave_room