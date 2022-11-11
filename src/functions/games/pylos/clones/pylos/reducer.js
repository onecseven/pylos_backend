"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reducer = void 0;
const token_js_1 = require("../../internal/token.js");
const helpers_js_1 = __importDefault(require("./helpers.js"));
const moves_js_1 = require("./moves.js");
let exec_PLACE = (move, state) => {
    var _a;
    let { x, y, z } = move.payload.destination;
    let { grid } = state.zones[z];
    let player_has_balls = state.players[move.player].BALLS.length > 0;
    let legal_destination = helpers_js_1.default.check_supports(state, { x, y, z }, { x, y, z });
    let tile = grid.get_tile(x, y);
    let dest_tile_is_empty = tile.type === "EMPTY";
    if (dest_tile_is_empty && player_has_balls && legal_destination) {
        let temp = state.players[move.player].BALLS.pop(); // we have already checked for empty array so we cast to get rid of error
        grid.set_tile(x, y, temp);
        if (move.payload.recover && move.payload.recover_origins) {
            exec_RECOVER((0, moves_js_1.RECOVER)(move.player, move.payload.recover_origins, move.payload.destination), state);
        }
    }
    else {
        let error = { dest_tile_is_empty, player_has_balls, legal_destination };
        (_a = state.global) === null || _a === void 0 ? void 0 : _a.funcs.on_move_failed(error, move);
        return state;
    }
    return state;
};
// needs to check it's raising the right color ball
let exec_RAISE = (move, state) => {
    var _a;
    let { origin, destination } = move.payload;
    let upper_grid = state.zones[destination.z].grid;
    let lower_grid = state.zones[origin.z].grid;
    let legal_destination = helpers_js_1.default.check_supports(state, destination, origin);
    let dest_tile_is_empty = upper_grid.get_tile(destination.x, destination.y).type === "EMPTY";
    let ball_exists = lower_grid.get_tile(origin.x, origin.y).type === "BALL";
    let ball_is_free = ball_exists && helpers_js_1.default.is_ball_free(state, origin);
    let player_owns_ball = move.player === lower_grid.get_tile(origin.x, origin.y).owner;
    let dest_tile_is_above = destination.z === origin.z + 1 || destination.z === origin.z + 2;
    if (dest_tile_is_empty &&
        dest_tile_is_above &&
        legal_destination &&
        ball_exists &&
        ball_is_free &&
        player_owns_ball) {
        let temp = lower_grid.get_tile(origin.x, origin.y);
        lower_grid.set_tile(origin.x, origin.y, new token_js_1.Token("EMPTY"));
        upper_grid.set_tile(destination.x, destination.y, temp);
        if (move.payload.recover && move.payload.recover_origins) {
            exec_RECOVER((0, moves_js_1.RECOVER)(move.player, move.payload.recover_origins, move.payload.destination), state);
        }
    }
    else {
        let checks = {
            dest_tile_is_empty,
            legal_destination,
            ball_exists,
            player_owns_ball,
            ball_is_free,
            dest_tile_is_above,
        };
        (_a = state.global) === null || _a === void 0 ? void 0 : _a.funcs.on_move_failed(checks, move);
    }
    return state;
};
let exec_RECOVER = (move, state) => {
    var _a;
    let { placed_ball, origins } = move.payload;
    let recover_bonus = helpers_js_1.default.check_recover_bonus(state, placed_ball);
    let player_owns_balls = origins.every((coords) => {
        return move.player === helpers_js_1.default.tile_from_coords(state, coords).owner;
    });
    let recovery_within_bounds = move.payload.origins.length <= 2;
    let recovery_on_allowed_levels = placed_ball.z < 2;
    let balls_are_free = origins.length > 1 ?
        helpers_js_1.default.is_ball_free(state, origins[0]) && helpers_js_1.default.is_ball_free(state, origins[1], origins[0])
        :
            helpers_js_1.default.is_ball_free(state, origins[0]); //UGLY HACK
    if (recover_bonus &&
        player_owns_balls &&
        recovery_within_bounds &&
        recovery_on_allowed_levels &&
        balls_are_free) {
        origins.forEach(({ x, y, z }) => {
            let { grid } = state.zones[z];
            let temp = grid.get_tile(x, y);
            grid.set_tile(x, y, new token_js_1.Token("EMPTY"));
            state.players[move.player].BALLS.push(temp);
        });
    }
    else {
        (_a = state.global) === null || _a === void 0 ? void 0 : _a.funcs.on_move_failed({
            recover_bonus,
            player_owns_balls,
            recovery_within_bounds,
            recovery_on_allowed_levels,
            balls_are_free,
        }, move, false);
    }
    return state;
};
let reducer = (state, move) => {
    switch (move.type) {
        case "PLACE":
            return { state: exec_PLACE(move, state) };
        case "RAISE":
            return { state: exec_RAISE(move, state) };
        default:
            return { state };
    }
};
exports.reducer = reducer;
