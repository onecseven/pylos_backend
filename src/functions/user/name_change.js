const messages = require("../messages")
const send_data = require("../switchboard/send_to_user")
const user_db = require("../../data/user")
const save_user = require("./save_user")

const change_name = async (user, data) => {
  let { name } = data
  if (name.length <= 4 && name.length >= 20) return send_data(messages.MOVE_FAILED("Name invalid"), user.id)
  let dbuser = user_db.get_user_by_id(user.id)
  if (dbuser) {
    let result = await user_db.update_user(user.id, name)
    if (!result) console.error("Couldn't name change the following user", JSON.stringify(user, null, 2))
  }
  user.name = data.name
  await save_user(user)
  send_data(messages.YOUR_ID(user.id, user.name), user.id)
}

module.exports = change_name

//fa3d4189-b407
