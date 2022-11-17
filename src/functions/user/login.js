const user_db = require("../../data/user")
const send_data = require("../switchboard/send_to_user")
const messages = require("../messages")
const switchboard = require("../../data/Switchboard")

const login = async (user, data) => {
  let actual_id = data.id
  let old_id = user.id
  let connection = switchboard.get(old_id)
  let db_user = await user_db.get_user_by_id(actual_id)
  if (!db_user) {
    send_data(messages.ERROR("ID not found"), old_id)
    user.id = actual_id
    user.user_id = actual_id
  } else {
    user.name = db_user.name
    user.id = db_user.user_id
    user.user_id = db_user.user_id
  }
  switchboard.add(actual_id, connection)
  send_data(messages.YOUR_ID(actual_id, user.name), actual_id)
}

module.exports = login
