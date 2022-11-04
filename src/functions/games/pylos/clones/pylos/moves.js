"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RECOVER = exports.RAISE = exports.PLACE = void 0;
let PLACE = (player, coords, recover_origins = null, recover = false) => {
    return {
        player,
        type: "PLACE",
        payload: { destination: coords, recover, recover_origins },
    };
};
exports.PLACE = PLACE;
let RAISE = (player, origin, destination, recover = false, recover_origins) => {
    return {
        player,
        type: "RAISE",
        payload: {
            origin,
            destination,
            recover,
            recover_origins,
        },
    };
};
exports.RAISE = RAISE;
let RECOVER = (player, origins, placed_ball) => {
    return { player, type: "RECOVER", payload: { origins, placed_ball } };
};
exports.RECOVER = RECOVER;
