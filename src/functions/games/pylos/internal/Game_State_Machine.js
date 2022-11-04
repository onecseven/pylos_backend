"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GSM = void 0;
const phase_tracker_js_1 = require("./phase_tracker.js");
const add_position_js_1 = require("./utils/add_position.js");
const bus_js_1 = require("./utils/bus.js");
var game_status;
(function (game_status) {
    game_status["RUNNING"] = "RUNNING";
    game_status["FINISHED"] = "FINISHED";
})(game_status || (game_status = {}));
class GSM {
    constructor(blueprint) {
        this.state = blueprint;
        this.reducer = blueprint.reducer;
        this.phase_tracker = new phase_tracker_js_1.phase_tracker(this.state.phases, [0, 1]);
        this.game_status = { game_status: "RUNNING" };
    }
    get current_player() {
        return this.phase_tracker.current_player;
    }
    send_move(move) {
        var _a, _b;
        let type_is_allowed = this.current_phase.allowed_moves.includes(move.type);
        let correct_player = this.phase_tracker.current_player === move.player;
        let game_is_not_finished = this.game_status.game_status === "RUNNING";
        if (type_is_allowed && correct_player && game_is_not_finished) {
            this.state.global.move_history.push(move);
            this.reducer(this.state, move);
            if ((_a = this.state.global) === null || _a === void 0 ? void 0 : _a.flags.move_failed) {
                this.state.global.flags.move_failed = false;
                return false;
            }
            this.advance_phase();
        }
        else {
            (_b = this.state.global) === null || _b === void 0 ? void 0 : _b.funcs.on_move_failed({ type_is_allowed, correct_player }, move, false);
            return false;
        }
        return true;
    }
    advance_phase() {
        let { win_condition_is_met, winner } = this.state.global.funcs.wincon_check(this.state);
        if (win_condition_is_met) {
            this.game_status.game_status = game_status.FINISHED;
            this.game_status.winner = winner;
        }
        else {
            this.phase_tracker.advance_phase();
            if (this.state.players[this.current_player].BALLS.length === 0) {
                this.phase_tracker.advance_phase();
            }
        }
    }
    get current_phase() {
        return this.phase_tracker.current_phase;
    }
    get current_turn() {
        return this.phase_tracker.current_turn;
    }
    get serial_state() {
        return {
            players: this.state.players,
            zones: (0, add_position_js_1.add_positions_to_3D_array)(this.state.zones.map(({ grid }) => grid.grid)),
            phases: this.state.phases,
            move_history: this.state.global.move_history,
            errors: this.state.global.errors,
            current_turn: this.current_turn,
            current_player: this.current_player,
            game_status: this.game_status,
        };
    }
    static decorator(pre_state, wincon_check) {
        let state = Object.assign(Object.assign({}, pre_state), { global: {
                move_history: [],
                errors: [],
                flags: {
                    move_failed: false,
                },
                funcs: {
                    on_move_failed: (flags, move, block_phase_advance = true) => {
                        if (state.global) {
                            state.global.flags.move_failed = block_phase_advance;
                            state.global.errors.push({ error: flags, failed_move: move });
                        }
                    },
                    // internal_send_move: (action: move, temp_state: state) => {
                    //   state.global.move_history.push(action)
                    //   state.reducer(temp_state, action)
                    // },
                    wincon_check,
                },
                bus: new bus_js_1.Bus(),
            } });
        return state;
    }
}
exports.GSM = GSM;
