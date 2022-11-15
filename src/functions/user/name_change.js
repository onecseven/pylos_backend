const messages = require("../messages")
const send_data = require("../switchboard/send_to_user")
const user_db = require("../../data/user")

const change_name = async (user, data) => {
  let { name } = data
  if (name.length >= 4 && name.length <= 20) {
    let result = await user_db.update_user(user.id, name)
    if (result) {
      send_data(messages.YOUR_ID(user.id, user.name), user.id)
      user.name = data.name
    } else {
      send_data(messages.MOVE_FAILED("Name change did not happen"), user.id)
    }
  }
}

module.exports = change_name

//fa3d4189-b407
