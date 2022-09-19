/**
 * Copyright 2020 Anicet Nougaret & contributors
 * See LICENCE.txt
 */

class User {
    id = ""
    ws = null
    name = ""
    rooms = {}
    rematch = false

    constructor(id, name, ws) {
        this.id = id;
        this.name = name;
        this.ws = ws;
    }

    sendData(data) {
        let stringified = JSON.stringify(data)
        this.ws.send(stringified)
        console.log("Sending to "+ this.id + "|" + this.name + ": " + stringified)
    }

    joinRoom(room) {
        let permitted = room.join(this)
        if(permitted) {
            this.rooms[room.id] = room
        }
        return permitted
    }

    onDeleted() {
        for(let id in this.rooms) {
            this.rooms[id].onUserLeft(this)
        }
    }

    toNetworkData() {
        return {
            name: this.name,
            id: this.id
        }
    }
}

module.exports = User