// External libraries
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { getUniqueID } = require("./functions/helpers/getUniqueID");
const create_user = require("./functions/user/create_user")
const server = http.createServer(express);
const wss = new WebSocket.Server({ server });

// Internal libraries
const router = require('./MessageRouter')

wss.on('connection', ws => {
    ws.id = getUniqueID();
    let user = create_user(ws.id, ws, "User#" + ws.id.substring(0, 3))

    console.log(`user ${ws.id} connected`)

    ws.on('message', message => {
        let data = JSON.parse(message)
        console.log("Receiving from "+user.id+"|"+user.name+": "+message)
        router(data, user)
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

