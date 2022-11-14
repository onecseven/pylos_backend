const db = require("./db")
const { Room, User, RoomUsers } = require("./models")
const { create_user, get_user_by_id } = require("./user_db")
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
 */
const create_room = async ({ room_id, max_users, host, game = null}) => {
  await db.sync()
  try {
    let room = await Room.create({ room_id, max_users, host, game })
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
 */
const get_room_by_id = async (room_id) => {
  await db.sync()
  try {
    let user = await Room.findOne({
      where: {
        room_id,
      },
    })
    console.log("Got Room: ", JSON.stringify(user, null, 2))
    return user
  } catch (e) {
    console.error(e)
  }
}

const get_users_on_room = async (room_id) => {
  await db.sync()
  try {
    let room = await Room.findOne({
      where: {
        room_id,
      },
    })
    // console.log("Got Room: ", JSON.stringify(room, null, 2))
    if (room) {
      let users = await room.getUsers()
      console.log(JSON.stringify(users, null, 2))
      return users
    }
  } catch (e) {
    console.error(e)
  }
}

;(async () => {
  await create_user({user_id: "notati", name: "rungen"})

  await create_room({room_id: "lol", max_users: 2, host: "notati"})
  // await add_user_to_room("lol", "notati")
  await get_users_on_room("lol")
})()

//TODO GAME UPDATE
