const rooms_db = require("../../data/room")
const send_to_user = require("./send_to_user")

const send_to_room = (data, roomId) => {
  rooms_db
    .get_users_on_room(roomId)
    .then((users) => {
      for (let user of users) {
        send_to_user(data, user.user_id)
      }
    })
    .catch((e) => console.log("Send to room failed."))
}

module.exports = send_to_room
