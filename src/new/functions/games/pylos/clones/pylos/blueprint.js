"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_pylos_game = void 0;
const token_js_1 = require("../../internal/token.js");
const phase_js_1 = require("../../internal/phase.js");
const reducer_js_1 = require("./reducer.js");
const Game_State_Machine_js_1 = require("../../internal/Game_State_Machine.js");
const moves_js_1 = require("./moves.js");
const zone_js_1 = require("../../internal/zone.js");
let win_con_check = (state) => {
    var _a, _b;
    // for (let player_index in state.players) {
    //   let player = state.players[player_index]
    //   let opponent = 1 - Number(player_index)
    //   if (player.BALLS.length === 0) {
    //     return {
    //       win_condition_is_met: true,
    //       winner: opponent,
    //     }
    //   }
    // }
    let winning_zone = state.zones[3];
    let ball_exists = ((_a = winning_zone.grid.get_tile(0, 0)) === null || _a === void 0 ? void 0 : _a.type) === "BALL";
    let owner = (_b = winning_zone.grid.get_tile(0, 0)) === null || _b === void 0 ? void 0 : _b.owner;
    if (ball_exists) {
        return {
            win_condition_is_met: true,
            winner: owner,
        };
    }
    return {
        win_condition_is_met: false,
        winner: -1,
    };
};
let game_state = () => Game_State_Machine_js_1.GSM.decorator({
    players: {
        0: {
            BALLS: new Array(15).fill(undefined).map((u) => new token_js_1.Token("BALL", 0)),
        },
        1: {
            BALLS: new Array(15).fill(undefined).map((u) => new token_js_1.Token("BALL", 1)),
        },
    },
    tokens: [new token_js_1.Token("BALL")],
    zones: [
        new zone_js_1.Zone("base", {
            type: "SQUARE",
            length: 4,
            width: 4,
            allowed_tokens: ["BALL"],
        }),
        new zone_js_1.Zone("level_one", {
            type: "SQUARE",
            length: 3,
            width: 3,
            allowed_tokens: ["BALL"],
        }),
        new zone_js_1.Zone("level_two", {
            type: "SQUARE",
            length: 2,
            width: 2,
            allowed_tokens: ["BALL"],
        }),
        new zone_js_1.Zone("win", {
            type: "ARRAY",
            width: 1,
            allowed_tokens: ["BALL"],
        }),
    ],
    phases: [new phase_js_1.Phase("PLACEMENT", ["PLACE", "RAISE", "PLACE_RECOVER"])],
    reducer: reducer_js_1.reducer,
}, win_con_check);
let create_pylos_game = () => new Game_State_Machine_js_1.GSM(game_state());
exports.create_pylos_game = create_pylos_game;
let pylos = new Game_State_Machine_js_1.GSM(game_state());
// let pylos_2 = create_pylos_game()
let moves_1 = (0, moves_js_1.PLACE)(0, { x: 0, y: 3, z: 0 });
// let moves_3 = PLACE(0, helpers.create_coords(1, 1, 0))
// let moves_4 = PLACE(1, helpers.create_coords(1, 0, 0))
// let moves_5 = PLACE(0, helpers.create_coords(2, 0, 0))
pylos.send_move(moves_1);
// pylos.send_move(moves_3)
// pylos.send_move(moves_4)
// pylos.send_move(moves_5)
// console.log(pylos.serial_state.zones)
// console.log(pylos_2.serial_state.move_history)
// lines
// let moves_2 = PLACE(1, helpers.create_coords(0,1,0))
// let moves_3 = PLACE(0, helpers.create_coords(0,2,0))
// let moves_4 = PLACE(1, helpers.create_coords(0,3,0))
