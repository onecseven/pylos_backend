// External libraries
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { getUniqueID } = require("./functions/helpers/getUniqueID");
const users = require("./data/users")
const register_user = require("./functions/user/register_user")
const user_disconnected = require("./functions/user/user_disconnected")
const server = http.createServer(express);
const wss = new WebSocket.Server({ server });

// Internal libraries
const router = require('./MessageRouter')

wss.on('connection', ws => {
    ws.id = getUniqueID();
    let user = users.create(ws.id, "User#" + ws.id.substring(0, 3))
    register_user(user, ws)
    console.log(`user ${ws.id} connected`)

    ws.on('message', async message => {
        let data = JSON.parse(message)
        console.log("Receiving from "+user.id+"|"+user.name+": "+ message + " ")
        await router(user, data)
    })

    ws.on('close', async (code, reason) => {
        await user_disconnected(user, code)

        reason = (reason != "" ? 'reason: '+reason : 'unknown reason')
        console.log(`user ${ws.id} disconnected for ${reason} with code: ${code}`)
    })

})

server.listen(3000, /*'0.0.0.0',*/ function() {
    console.log(`Server is listening on ${3000}!`)
})


