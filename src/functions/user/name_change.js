const messages = require("../messages")
const send_data = require("../switchboard/send_to_user")
const change_name = (user, data) => {
  let { name } = data
  if (name.length >= 4 && name.length <= 10) user.name = name
  send_data(messages.YOUR_ID(user.id, user.name), user.id)
}

module.exports = change_name

//fa3d4189-b407