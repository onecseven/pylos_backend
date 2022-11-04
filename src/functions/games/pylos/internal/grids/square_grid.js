"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqGrid = void 0;
const token_js_1 = require("../token.js");
const doTimes_js_1 = require("../utils/doTimes.js");
let create_grid = (w, h) => {
    let grid = [];
    (0, doTimes_js_1.doTimes)(h, () => {
        let inner = [];
        (0, doTimes_js_1.doTimes)(w, () => {
            inner.push(new token_js_1.Token("EMPTY"));
        });
        grid.push(inner);
    });
    return grid;
};
/* TODO
* Add allowed tokens
*/
class SqGrid {
    constructor(w, h) {
        this.grid = create_grid(w, h);
    }
    get_tile(x, y) {
        return this.grid[y][x];
    }
    set_tile(x, y, value) {
        this.grid[y][x] = value;
        return;
    }
}
exports.SqGrid = SqGrid;
