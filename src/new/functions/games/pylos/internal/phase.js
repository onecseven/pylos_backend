"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Phase = void 0;
class Phase {
    constructor(name, allowed_moves) {
        this.type = "PHASE";
        this.allowed_moves = [];
        this.name = name;
        this.allowed_moves = allowed_moves;
    }
}
exports.Phase = Phase;
/* TODO

Maybe we can reimplement the events bus to make some phases conditional.
We could have a conditional toggle on the constructor and specify that an event that would
need to have been fired in the last phase in order to let the Phase go through.

*/ 
