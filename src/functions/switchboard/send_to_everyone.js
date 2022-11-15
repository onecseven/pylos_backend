const rooms_db = require("../../data/room")
const send_to_user = require("./send_to_user")

const send_to_room = (data, roomId) => {
  rooms_db
    .get_users_on_room(roomId)
    .then((users) => {
      users.forEach(({user_id}) => {
        send_to_user(data, user_id)
      })
    })
    .catch((e) => console.log("Send to room failed.", e))
}

module.exports = send_to_room
