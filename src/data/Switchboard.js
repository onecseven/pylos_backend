class Switchboard {
  /* id: {
    connection: ws,
  } */
  users = new Map()

  get(id) {
    if (this.users.has(id)) {
      return this.users.get(id)
    } else {
      return null
    }
  }

  add(id, connection){
    this.users.set(id, connection)
  }

  remove(id) {
    this.users.delete(id)
  }
}

let singleton = new Switchboard()

module.exports = singleton