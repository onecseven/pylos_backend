const users = require("../../data/users")
const messages = require("../messages")
const User = require("../../data/User")
const create_user = (id, ws, name) => {
  users[id] = new User(id, name, ws)
  users[id].sendData(messages.YOUR_ID(this.users[id].id, this.users[id].name))
  return this.users[id]
}

module.exports = create_user