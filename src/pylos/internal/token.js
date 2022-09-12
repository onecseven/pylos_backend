"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
class Token {
    constructor(type, owner = -1) {
        this.type = type;
        this.owner = owner;
    }
}
exports.Token = Token;
