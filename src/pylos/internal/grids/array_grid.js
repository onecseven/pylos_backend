"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayGrid = void 0;
const token_js_1 = require("../token.js");
class ArrayGrid {
    constructor(w) {
        this.grid = new Array(w).fill(undefined).map(v => new token_js_1.Token("EMPTY"));
    }
    get_tile(x) {
        return this.grid[x];
    }
    set_tile(x, value) {
        this.grid[x] = value;
    }
}
exports.ArrayGrid = ArrayGrid;
