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
      let result = await user.update({ name: new_name })
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
const create_user = async ({ user_id, name }) => {
  await db.sync()
  try {
    let user = await User.create({ user_id, name })
    console.log("User Created: ", user.user_id)
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
    console.log("Got User: ", user?.user_id)
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
    console.log("Got User: ", user?.user_id)
    if (user) {
      let rooms = await user.getRooms()
      return rooms?.map((room) => room.room_id)
    }
    return user
  } catch (e) {
    console.error(e)
  }
}

const get_user_with_rooms = async (user_id) => {
  //lmao get fucked sequelize... i dont have to "associate" shit

  let query_string =
    "SELECT `rooms`.`room_id`, `rooms`.`max_users`, `rooms`.`game`,`rooms`.`host`, `rooms`.`rematch` FROM `rooms` AS `rooms` INNER JOIN `room_users` as `room_users` ON `rooms`.`room_id` = `room_users`.`roomRoomId` and `room_users`.`userUserId` ='" +
    user_id +
    "';"
  try {
    let [results, meta] = await db.query(query_string)
    let user = await User.findByPk(user_id, {
      attributes: ["user_id", "name"],
    })
    if (user && results) {
      return {
        ...user.toJSON(),
        rooms: results,
      }
    }
    return null
  } catch (e) {
    console.error(e)
    return null
  }
}


;(async () => {
  // await get_user_by_id("notsati")
  // let q = await update_user("notati", "hypertatis2")
  // console.log(q)
  // console.log(q)
  // let x = await get_rooms_user_is_in("notati")
  // let x = await get_user_with_rooms("tati")
  // console.log(x)
})()

module.exports = {
  create_user,
  get_user_by_id,
  get_rooms_user_is_in,
  update_user,
  get_user_with_rooms,
}
