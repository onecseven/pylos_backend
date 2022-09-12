"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doTimes = void 0;
const doTimes = (n, iteratee) => {
    if (n < 1 || n > 9007199254740991) {
        return false;
    }
    while (n > 0) {
        iteratee();
        n--;
    }
    return true;
};
exports.doTimes = doTimes;
