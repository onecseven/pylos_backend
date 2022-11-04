// External libraries
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const server = http.createServer(express);
const wss = new WebSocket.Server({ server });

// Internal libraries
const RoomsManager = require('./RoomsManager')
const UsersManager = require('./UsersManager')

wss.on('connection', ws => {
    ws.id = getUniqueID();
    let user = UsersManager.createUser(ws.id, ws, "User#" + ws.id.substring(0, 3))

    console.log(`user ${ws.id} connected`)

    ws.on('message', message => {
        let data = JSON.parse(message)

        console.log("Receiving from "+user.id+"|"+user.name+": "+message)
        UsersManager.handleMessage(data, user)
        RoomsManager.handleMessage(data, user)
    })

    ws.on('close', (code, reason) => {
        UsersManager.removeUser(ws.id)

        reason = (reason != "" ? 'reason: '+reason : 'unknown reason')
        console.log(`user ${ws.id} disconnected for ${reason} with code: ${code}`)
    })

})

server.listen(3001, /*'0.0.0.0',*/ function() {
    console.log(`Server is listening on ${3001}!`)
})

function getUniqueID () {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
    }
    return s4() + s4() + '-' + s4()
}