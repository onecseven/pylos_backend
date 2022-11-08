module.exports = {
  YOUR_ID: (id, name) => ({ message: "Your id", id: id, name: name }),
  JOINED_ROOM: (roomId, usersND, host) => ({
    message: "Joined room",
    roomId: roomId,
    usersND: usersND,
    host: host,
  }),
  FAILED_TO_JOIN_ROOM: (reason) => ({
    message: "Failed to join room",
    reason: reason,
  }),
  USER_JOINED: (roomId, userND) => ({
    message: "User joined",
    roomId: roomId,
    userND: userND,
  }),
  USER_LEFT: (roomId, userId) => ({
    message: "User left",
    roomId: roomId,
    userId: userId,
  }),
  UPDATE_HOST: (roomId, userId) => ({
    message: "Update host",
    roomId: roomId,
    userId: userId,
  }),
  ROOM_DELETED: (roomId) => ({ message: "Game deleted", roomId: roomId }),
  GAME_STARTED: (roomId) => ({ message: "Game started", roomId: roomId }),
  GAME_START_FAIL: (reason) => ({ message: "Game failed to start", reason }),
  GAME_STATE: (serialized_state) => ({
    message: "Game state update",
    state: serialized_state,
  }),
  GIVE_TURN_ORDER: (player_num) => ({
    message: "You are player",
    player: player_num,
  }),
  MOVE_FAILED: (reason) => ({ message: "move failed", reason }),
  GAME_END: (winner) => ({ message: "game finished", winner }),
  REMATCH_OFFERED: (rematcher) => ({
    message: "rematch offered",
    from: rematcher.id,
  }),
  YOUR_ROOMS: (rooms) => ({
    message: "your rooms",
    rooms
  })
}
