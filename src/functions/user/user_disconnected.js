const switchboard = require("../../data/Switchboard")
const users = require("../../data/users")
// change this to switch board
const user_disconnected =  async (id)  => {
  switchboard.remove(id)
  await users.log_out(id)
}   

module.exports = user_disconnected