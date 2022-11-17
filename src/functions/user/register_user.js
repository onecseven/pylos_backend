const messages = require("../messages")
const switchboard = require("../../data/Switchboard")
const send_data = require("../switchboard/send_to_user")

const register_user = (user, ws) => {
  switchboard.add(user.id, ws)
  send_data(messages.YOUR_ID(user.id, user.name), user.id)
  return
}

module.exports = register_user