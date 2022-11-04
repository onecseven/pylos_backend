"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.phase_tracker = void 0;
const looper_js_1 = require("./utils/looper.js");
class phase_tracker {
    constructor(phases, players) {
        this.current_turn = 0;
        this._get_next_phase = (0, looper_js_1.looper)(phases);
        this._get_next_turn = (0, looper_js_1.looper)(players);
        this.current_phase = this._get_next_phase();
        this.current_player = this._get_next_turn();
        this.initial_phase = phases[0];
    }
    advance_turn() {
        this.current_player = this._get_next_turn();
        this.current_turn++;
    }
    advance_phase() {
        let next_phase = this._get_next_phase();
        if (next_phase.name === this.initial_phase.name) {
            this.advance_turn();
        }
        this.current_phase = next_phase;
    }
}
exports.phase_tracker = phase_tracker;
//this only works with symmetrical games
// let dummydata = new phase_tracker([new Phase("PLACEMENT", []), new Phase("SCORING", [])], [0,1])
