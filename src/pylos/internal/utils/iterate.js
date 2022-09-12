"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iterate = void 0;
function* iterate(arr) {
    let index = 0;
    if (index < arr.length - 1) {
        index++;
    }
    else {
        index = 0;
    }
    yield arr[index];
}
exports.iterate = iterate;
