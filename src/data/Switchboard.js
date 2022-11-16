class Switchboard {
  /* id: {
    connection: ws,
  } */
  users = new Map()
  games = new Map()
  get(id) {
    if (this.users.has(id)) {
      return this.users.get(id)
    } else {
      return null
    }
  }

  add(id, connection) {
    this.users.set(id, connection)
  }

  remove(id) {
    this.users.delete(id)
  }

  get_game(id) {
    if (this.games.has(id)) return this.games.get(id)
    else return null
  }
  /**
   * also serves as update
   * @param {string} id 
   * @param {GSM} GSM 
   */
  add_game(id, GSM) {
    this.games.set(id, GSM)
  }
  
  remove_game(id) {
    this.games.delete(id)
  }
}

let singleton = new Switchboard()

module.exports = singleton
