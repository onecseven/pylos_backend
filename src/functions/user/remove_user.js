const users = require("../../data/users")

const remove_user = (id)  => {
  users[id].onDeleted()
  delete users[id]
}   

module.exports = remove_user