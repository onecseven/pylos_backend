"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.looper = void 0;
//let linked_test_data = link_zones(test_data)
let looper = (array) => {
    let index = -1;
    let max = array.length - 1;
    return () => {
        index++;
        if (index > max)
            index = 0;
        return array[index];
    };
};
exports.looper = looper;
