const db = require("./db/db")
const { Room, User, RoomUsers } = require("./db/models")
const { create_user, get_user_by_id } = require("./user")


/**
 * @typedef room_record
 * @type {object}
 * @property {string} room_id - an unique ID.
 * @property {number} max_users - usually 2.
 * @property {string} game - json of played moves
 * @property {string} host - id of room creator
 */

/**
 *
 * @param {room_record} {object} room record
 * @returns {Model | null}
 */
const create_room = async ({ room_id, max_users = 2, host, game = null }) => {
  await db.sync()
  try {
    let room = await Room.create({ room_id, max_users, host, game, rematch: 0 })
    if (room) {
      console.log("Room Created: ", room.room_id)
      let user = await get_user_by_id(host)
      await room.addUser(user)
    }
    return room
  } catch (e) {
    console.error(e)
  }
}

/**
 *
 * @param {string} room_id
 * @param {string} user_id
 * @returns {Model | null}
 */
const add_user_to_room = async (room_id, user_id) => {
  await db.sync()
  try {
    let room = await get_room_by_id(room_id)
    let user = await get_user_by_id(user_id)
    if (room && user) await room.addUser([user])
  } catch (e) {
    console.error(e)
  }
}

/**
 *
 * @param {string} room_id
 * @param {object} new_move
 * @returns {Model | null}
 */
const update_game_in_room = async (room_id, new_move) => {
  await db.sync()
  try {
    let room = await get_room_by_id(room_id)
    if (!room.move_list) room.move_list = "[]"
    let move_list = JSON.parse(room.move_list)
    move_list.push(new_move)
    room.update({ game: JSON.stringify(move_list) })
    console.log(
      "Updated Game in Room " + room_id + ":",
      JSON.stringify(new_move, null, 2)
    )
    room.save()
    return room
  } catch (e) {
    console.error(e)
  }
}
/**
 *
 * @param {string} room_id
 * @returns {Model | null}
 */
const get_room_by_id = async (room_id) => {
  await db.sync()
  try {
    let room = await Room.findOne({
      where: {
        room_id,
      },
    })
    console.log("Got Room: ", room.room_id)
    return room
  } catch (e) {
    console.error(e)
  }
}
/**
 *
 * @param {string} room_id
 * @returns {{user_id, name}[]}
 */
const get_users_on_room = async (room_id) => {
  //lmao get fucked sequelize... i dont have to "associate" shit
  let query_string =
    "SELECT `users`.`user_id`, `users`.`name` FROM `users` AS `users` INNER JOIN `room_users`  ON `users`.`user_id` = `room_users`.`userUserId` AND `room_users`.`roomRoomId` =" +
    "'" +
    room_id +
    "'" +
    " ORDER BY `room_users`.`updatedAt` ASC;"
  await db.sync()
  try {
    let [results, meta] = await db.query(query_string)
    if (results.length) {
      return results.map(({ user_id, name }) => ({ user_id, name }))
    }
  } catch (e) {
    console.error(e)
  }
}

const get_room_with_users = async (room_id) => {
  //lmao get fucked sequelize... i dont have to "associate" shit
  let query_string =
    "SELECT `user`.`user_id`, `user`.`name` FROM `users` AS `user` INNER JOIN `room_users` AS `room_users` ON `user`.`user_id` = `room_users`.`userUserId` AND `room_users`.`roomRoomId` =" +
    "'" +
    room_id +
    "'" +
    " ORDER BY `room_users`.`updatedAt` ASC;"

  await db.sync()
  try {
    let [results, meta] = await db.query(query_string)
    let room = await Room.findByPk(room_id, {attributes: ['room_id', 'max_users', 'game', 'host', 'rematch']})
    if (room && results) {
      return {
        ...room.toJSON(),
        users: results.map(({ user_id, name }) => ({ user_id, name }))
      }
    }
    return null 
  } catch (e) {
    console.error(e)
    return null
  }
}

const get_user_with_rooms_with_users = async (user_id) => {
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
      let filtered = []
      for (let room of results) {
        console.log("HERE", room)
        let users = await get_users_on_room(room.room_id)
        filtered.push({...room, users})
      }
      console.log(filtered)
      return {
        ...user.toJSON(),
        rooms: filtered,
      }
    }
    return null
  } catch (e) {
    console.error(e)
    return null
  }
}


;(async () => {
  // await create_user({ user_id: "notati", name: "rungen" })
  // await create_user({ user_id: "errorwithcreate", name: "isittrue" })
  // let x =  await get_room_by_id("loul2")
  // let x = await create_room({ room_id: "loul2", host: "notati" })
  // let y = x.hasUser()
  // await add_user_to_room("loul2", "sitati")
  // console.log( x.hasUser("notati"))
  // x.rematch = 1
  // x.save()
  // await add_user_to_room("lol", "notati")
  // await update_game_in_room("lol", JSON.stringify(["hi","hey", "how are you"]))
  // console.log(JSON.stringify(x, null, 2))
})()

module.exports = {
  create_room,
  add_user_to_room,
  update_game_in_room,
  get_room_by_id,
  get_users_on_room,
  get_room_with_users,
  get_user_with_rooms_with_users
}
