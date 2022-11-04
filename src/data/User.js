class N_User {
    id = ""
    ws = null
    name = ""
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

    serialize() {
        return {
            name: this.name,
            id: this.id
        }
    }
    
}

module.exports = N_User