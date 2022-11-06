const users = require("../../data/users")
const send_data = require("../switchboard/send_to_user")
const messages = require("../messages")
const switchboard = require("../../data/Switchboard")


const login = async (user, data) => {
  let actual_id = data.id
  let old_id = user.id
  let connection = switchboard.get(old_id)
  await users.log_in(actual_id, old_id)
  
  let new_user = users.get(actual_id)
  
  Object.assign(user,new_user )
  
  switchboard.add(actual_id, connection)
  send_data(messages.YOUR_ID(user.id, users.get(user.id).name), user.id)
}

module.exports = login