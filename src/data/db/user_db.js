const db = require("./db")
const { Room, User, RoomUsers } = require("./models")

/**
 * @typedef user_record
 * @type {object}
 * @property {string} user_id - an unique ID.
 * @property {string} name - name.
 */

/**
 *
 * @param {string} id
 * @param {string} new_name 
 */
const update_user = async (id, new_name) => {
  await db.sync()
  try {
    let user = await get_user_by_id(id)
    if (user) {
      let result = await user.update({name: new_name})
      return result
    }
  } catch (e) {
    console.error(e)
  }

}

/**
 *
 * @param {user_record} {object}
 */
const create_user = async ({user_id, name}) => {
  await db.sync()
  try {
    let user = await User.create({ user_id, name })
    console.log("User Created: ", JSON.stringify(user, null, 2))
    return user
  } catch (e) {
    console.error(e)
  }
}

/**
 *
 * @param {string} user_id
 */
const get_user_by_id = async (user_id) => {
  await db.sync()
  try {
    let user = await User.findOne({
      where: {
        user_id,
      },
    })
    console.log("Got User: ", JSON.stringify(user, null, 2))
    return user
  } catch (e) {
    console.error(e)
  }
}

; (async () => {
  // await get_user_by_id("notsati")
  // let q = await update_user("notati", "hypertatis")  
  // console.log(q)
})();



module.exports = {
  create_user,
  get_user_by_id
}
