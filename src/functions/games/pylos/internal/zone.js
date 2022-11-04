"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Zone = void 0;
const array_grid_js_1 = require("./grids/array_grid.js");
const square_grid_js_1 = require("./grids/square_grid.js");
class Zone {
    constructor(name, options) {
        this.name = name;
        this.allowed_tokens = options.allowed_tokens;
        options.length = options.length || 0;
        switch (options.type) {
            case "SQUARE":
                this.grid = new square_grid_js_1.SqGrid(options.width, options.length);
                break;
            case "HEX":
                this.grid = new square_grid_js_1.SqGrid(options.width, options.length);
                break;
            case "ARRAY":
                this.grid = new array_grid_js_1.ArrayGrid(options.width);
                break;
        }
    }
}
exports.Zone = Zone;
/*
TODO

* Implement hex grids

*/ 
