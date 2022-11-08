const switchboard = require("../../data/Switchboard")

const send_data = (data, id) => {
  let ws = switchboard.get(id)
  if (ws) {
    let stringified = JSON.stringify(data)
    ws.send(stringified)
    console.log("Sending to "+ id + ": " + data.message)
  } else {
    console.log("User " + id + " not found on switchboard.")
  }
}

module.exports = send_data