const rooms = require("../../data/rooms")
const messages = require("../messages")
const send_to_room = require("../switchboard/send_to_everyone")

const leave_room = (user, data) => {
  let id = data.roomId
  let room = rooms.get(id)
  if (!room) {
    console.error("No such room")
    return
  }
  
  if (!room.users.includes(user)){
    console.error("Someone tried to leave a room they're not in")
  }

  if (!room.game) {
    room.exit(user)
    send_to_room(messages.USER_LEFT(id, user.id), room.id)
    //delete rooms[id]
    //delete from persist
  } else if (room.game) {
    console.error("Game running")
    //TODO
    //PERSIST ROOM
  }
}

module.exports = leave_room