/**
 * Copyright 2020 Anicet Nougaret & contributors
 * See LICENCE.txt
 */

const User = require('../N-User')
const messages = require('./messages')

class UsersManager {
    users = {}

    createUser(id, ws, name) {
        this.users[id] = new User(id, name, ws)
        this.users[id].sendData(messages.YOUR_ID(this.users[id].id, this.users[id].name))
        return this.users[id]
    }
    

    removeUser(id) {
        this.users[id].onDeleted()
        delete this.users[id]
    }   
}

let singleton = new UsersManager()

module.exports = singleton