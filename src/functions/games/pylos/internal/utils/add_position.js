"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.add_positions_to_3D_array = void 0;
let add_positions_to_3D_array = (arr) => {
    let result = arr.map((zone, z) => {
        return zone.map((inner, y) => {
            if (Array.isArray(inner)) {
                return inner.map((tile, x) => {
                    tile.pos = { x, y, z };
                    return tile;
                });
            }
            else if (typeof inner === "object") {
                inner.pos = { x: 0, y: 0, z };
                return inner;
            }
        });
    });
    return result;
};
exports.add_positions_to_3D_array = add_positions_to_3D_array;
