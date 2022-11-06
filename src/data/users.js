const storage = require("./storage")

storage.init()
class User {
    id = ""
    name = ""
    rematch = false
    rooms = []

    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    serialize() {
        return {
            name: this.name,
            id: this.id
        }
    }

    has_joined_room(id){
      this.rooms.push(id)
    }
    
    left_room(id) {
      this.rooms.splice(this.rooms.indexOf(id), 1)
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

  async log_out(id) {
    await storage.setItem(id, this.users.get(id))
    this.users.delete(id)
  }

  async log_in(actual_id, old_id) {
    let keys = await storage.keys()
    if (keys.includes(actual_id)) {
      let user = await storage.getItem(actual_id)
      this.add(user)
      this.remove(old_id)
    } else {
      let temp_user = this.get(actual_id)
      this.create(actual_id, temp_user.name)
      this.remove(old_id)
    }
  }
}
////{"message": "login","id": "fa3d4189-b407"}

let singleton = new Users()

module.exports = singleton