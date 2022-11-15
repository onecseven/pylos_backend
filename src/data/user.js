const db = require("./db/db")
const { Room, User, RoomUsers } = require("./db/models")

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
 * @returns {Model | null}
 */
const update_user = async (user_id, new_name) => {
  await db.sync()
  try {
    let user = await get_user_by_id(user_id)
    if (user) {
      let result = await user.update({name: new_name})
      return result
    }
  } catch (e) {
    console.error(e)
    return null
  }

}

/**
 *
 * @param {user_record}
 * @returns {Model | null}
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
 * @returns {Model | null}
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
/**
 * 
 * @param {*} user_id 
 * @returns 
 */
const get_rooms_user_is_in = async (user_id) => {
  await db.sync()
  try {
    let user = await User.findOne({
      where: {
        user_id,
      },
    })
    console.log("Got User: ", JSON.stringify(user, null, 2))
    if (user) {
      let rooms = await user.getRooms()
      return rooms?.map(room => room.room_id)
    }
    return user
  } catch (e) {
    console.error(e)
  }
}

; (async () => {
  // await get_user_by_id("notsati")
  // let q = await update_user("notati", "hypertatis2")
  // console.log(q)  
  // console.log(q)
  // let x = await get_rooms_user_is_in("notati")
})();

module.exports = {
  create_user,
  get_user_by_id,
  get_rooms_user_is_in,
  update_user
}
