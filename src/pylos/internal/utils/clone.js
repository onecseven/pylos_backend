"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepClone = void 0;
const deepClone = (obj) => {
    if (null == obj || typeof obj != "object")
        return obj;
    // Handle Date
    if (obj instanceof Array) {
        let result = obj.map(item => (0, exports.deepClone)(item));
        return result;
    }
    var newObject = {};
    for (let key in obj) {
        if (typeof obj[key] === 'object') {
            newObject[key] = (0, exports.deepClone)(obj[key]);
        }
        else {
            newObject[key] = obj[key];
        }
    }
    return newObject;
};
exports.deepClone = deepClone;
