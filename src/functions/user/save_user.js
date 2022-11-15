const user_db = require("../../data/user")

const save_user = async (user) => {
  let dbuser = await user_db.create_user({
    user_id: user.id,
    name: user.name,
  })
  if (dbuser) return dbuser
  return null
}

module.exports = save_user
