"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pylos_zones = void 0;
const zone_js_1 = require("../../internal/zone.js");
let base = new zone_js_1.Zone("base", {
    type: "SQUARE",
    length: 4,
    width: 4,
    allowed_tokens: ["BALL"],
});
let level_one = new zone_js_1.Zone("level_one", {
    type: "SQUARE",
    length: 3,
    width: 3,
    allowed_tokens: ["BALL"],
});
let level_two = new zone_js_1.Zone("level_two", {
    type: "SQUARE",
    length: 2,
    width: 2,
    allowed_tokens: ["BALL"],
});
let winning = new zone_js_1.Zone("win", {
    type: "ARRAY",
    width: 1,
    allowed_tokens: ["BALL"],
});
exports.pylos_zones = [
    base,
    level_one,
    level_two,
    winning,
];
