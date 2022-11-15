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
      console.log("Room Created: ", JSON.stringify(room, null, 2))
      let user = await get_user_by_id(host)
      room.addUser(user)
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
    if (room && user) room.addUser([user])
  } catch (e) {
    console.error(e)
  }
}

/**
 *
 * @param {string} room_id
 * @param {string[]} move_list
 * @returns {Model | null}
 */
const update_game_in_room = async (room_id, move_list) => {
  await db.sync()
  try {
    let room = await get_room_by_id(room_id)
    room.update({ game: JSON.stringify(move_list) })
    console.log(
      "Updated Game in Room " + room_id + ":",
      JSON.stringify(move_list)
    )
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
    console.log("Got Room: ", JSON.stringify(room, null, 2))
    return room
  } catch (e) {
    console.error(e)
  }
}
/**
 *
 * @param {string} room_id
 * @returns {string[]}
 */
const get_users_on_room = async (room_id) => {
  await db.sync()
  try {
    let users = await RoomUsers.findAll({
      where: {
        roomRoomId: room_id,
      },
      order: [["updatedAt", "ASC"]],
    })
    return users?.map(({ userUserId, roomRoomId }) => userUserId)
  } catch (e) {
    console.error(e)
  }
}

;(async () => {
  // await create_user({ user_id: "notati", name: "rungen" })
  await create_user({ user_id: "sitati", name: "rongen" })
  // let x =  await get_room_by_id("loul2")
  // let x = await create_room({ room_id: "loul2", host: "notati" })
  // let y = x.hasUser()
  await add_user_to_room("loul2", "sitati")
  // console.log( x.hasUser("notati"))
  // x.rematch = 1
  // x.save()
  // await add_user_to_room("lol", "notati")
  // await get_users_on_room("lol")
  // await update_game_in_room("lol", JSON.stringify(["hi","hey", "how are you"]))
  let x = await get_users_on_room("loul2")
  console.log(x)
})()

module.exports = {
  create_room,
  add_user_to_room,
  update_game_in_room,
  get_room_by_id,
  get_users_on_room,
}
