const user_db = require("./db/user_db")
const room_db = require("./rooms")
class User {
  id = ""
  name = ""
  rematch = false
  rooms = []

  constructor(id, name) {
    this.id = id
    this.name = name
  }

  serialize() {
    return {
      name: this.name,
      id: this.id,
      rooms: this.rooms,
    }
  }

  static deserialize(serializedUser) {
    let temp = new User(serializedUser.id, serializedUser.name)
    temp.rooms = serializedUser.rooms
    return temp
  }

  has_joined_room(id) {
    this.rooms.push(id)
    this.rooms = [...new Set(this.rooms)]
  }

  left_room(id) {
    this.rooms = this.rooms.filter((iid) => id === id)
  }
}

class Users {
  users = new Map()

  get(id) {
    if (this.users.has(id)) return this.users.get(id)
    return null
  }

  create(id, name) {
    let user = new User(id, name)
    this.users.set(user.id, user)
    return user
  }

  add(user) {
    this.users.set(user.id, user)
  }

  remove(id) {
    this.users.delete(id)
  }

  async save_user(user_id) {
    let serializedUser = this.users.get(id).serialize()
    let { rooms } = serializedUser
    let user = await user_db.create_user({
      user_id: serializedUser.id,
      name: serializedUser.name,
    })
    if (user) {
      for (let room of rooms) {
        await room_db.add_user_to_room(room, user_id)
      }
    }
  }

  async log_in(actual_id, old_id) {
    let user = await user_db.get_user_by_id(actual_id)
    if (!user) {
      let temp_user = this.get(old_id)
      this.remove(old_id)
      return this.create(actual_id, temp_user.name)
    }
/*  problem: get_user_by_id() doesn't give us the rooms
    let's try to switch everything then come back to this problem
    this could be fixed by creating a function on user_db.js
    that gets all the usual class User information and massages it
    from db format to this format. We would be building a kind of
    middleware between the in-memory stuff and the db. Let's try a new
    branch where it's just sqlite3

    let logged_in = User.deserialize()
    this.add(user)
    this.remove(old_id)
*/
  }
}

let singleton = new Users()

module.exports = singleton
