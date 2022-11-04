const messages = require("../../messages")

const change_name = (user, data) => {
  let { name } = data
  if (name.length >= 4 && name.length <= 10) user.name = name
  user.sendData(messages.YOUR_ID(user.id, user.name))
}

module.exports = change_name