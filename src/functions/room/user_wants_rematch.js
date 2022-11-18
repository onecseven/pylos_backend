const rooms_db = require("../../data/room")
const start_pylos = require("../games/start_pylos")
const messages = require("../messages")
const send_to_room = require("../switchboard/send_to_everyone")

let rematched = (user, roomId) => send_to_room(messages.REMATCH_OFFERED(user), roomId)

const user_wants_rematch = async (user, data) => {
  let id = data.gameId
  let room = await rooms_db.get_room_by_id(id)
  
  if (!room) return null //todo, handle?

  if (room.hasUser(user.id)) {
    room.rematch += 1 
  }

  if (room.rematch >= room.max_users) {
    room.rematch = 0 
    start_pylos({id: room.host}, data)
  } else {
    rematched(user, id)
  }
  room.save()
}

module.exports = user_wants_rematch