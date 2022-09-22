"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let isToken = (x) => {
    return typeof x.type === "string" && x.type !== "EMPTY";
};
let create_coords = (x, y, z) => {
    return { x, y, z };
};
let coord_equality_check = (a, b) => {
    return a.x === b.x && a.y === b.y && a.z === b.z;
};
let get_supports = (orig) => {
    let results = [];
    let { x, y, z } = orig;
    if (orig.z > 0) {
        results.push(create_coords(x, y, z - 1), create_coords(x + 1, y, z - 1), create_coords(x, y + 1, z - 1), create_coords(x + 1, y + 1, z - 1));
    }
    return results;
};
let get_intersecting_lines = (orig) => {
    let { x, y, z } = orig;
    let limit = 3 - z;
    let vertical = [];
    let horizontal = [];
    for (let i = 0; i <= limit; i++) {
        vertical.push(create_coords(x, i, z));
        horizontal.push(create_coords(i, y, z));
    }
    let result = {
        vertical: vertical,
        horizontal: horizontal,
    };
    return result;
};
let get_potential_cubes = (orig) => {
    let { x, y, z } = orig;
    let limit_size = 3 - z;
    let cubes = {
        1: [
            orig,
            create_coords(x, y - 1, z),
            create_coords(x + 1, y, z),
            create_coords(x + 1, y - 1, z),
        ],
        2: [
            orig,
            create_coords(x - 1, y - 1, z),
            create_coords(x, y - 1, z),
            create_coords(x - 1, y, z),
        ],
        3: [
            orig,
            create_coords(x + 1, y, z),
            create_coords(x, y + 1, z),
            create_coords(x + 1, y + 1, z),
        ],
        4: [
            orig,
            create_coords(x - 1, y, z),
            create_coords(x - 1, y + 1, z),
            create_coords(x, y + 1, z),
        ],
    };
    for (let i in cubes) {
        let cube = cubes[i];
        cubes[i] = cube.filter(({ x, y, z }) => {
            return x >= 0 && y >= 0 && z >= 0 && limit_size >= x && limit_size >= y;
        });
        if (cubes[i].length !== 4) {
            cubes[i] = [];
        }
    }
    return cubes;
};
let get_potential_blockers = (orig) => {
    let results = [];
    let { x, y, z } = orig;
    if (z === 3 || z < 0) {
        throw new Error(`wrong coords, get_potential supported, ${JSON.stringify(orig, null, 2)}`);
    }
    let limit_size = 3 - z;
    results.push(create_coords(x, y, z + 1), create_coords(x - 1, y, z + 1), create_coords(x, y - 1, z + 1), create_coords(x - 1, y - 1, z + 1));
    results = results.filter(({ x, y, z }) => {
        return x >= 0 && y >= 0 && z >= 0 && limit_size > x && limit_size > y;
    });
    return results;
};
/* state required */
let tile_from_coords = (state, coords) => {
    let { x, y, z } = coords;
    let grid = state.zones[z].grid;
    return grid.get_tile(x, y);
};
let is_ball_free = (state, origin) => {
    let potential_blockers = get_potential_blockers(origin);
    for (let tile of potential_blockers) {
        let token = tile_from_coords(state, tile);
        if (token.type === "BALL") {
            return false;
        }
    }
    return true;
};
let check_supports = (state, destination, origin) => {
    if (destination.z > 0) {
        let underboard = state.zones[destination.z - 1].grid;
        let supports = get_supports(destination).filter((coord) => {
            return !coord_equality_check(coord, origin);
        });
        let supports_are_present = supports.every((coord) => {
            return underboard.get_tile(coord.x, coord.y).type === "BALL";
        });
        return supports_are_present && supports.length === 4;
    }
    else if (destination.z === 0) {
        return true;
    }
    else {
        throw new Error("destination.z < 0");
        return false;
    }
};
let check_lines = (state, placed_ball) => {
    let lines = get_intersecting_lines(placed_ball);
    let ball = tile_from_coords(state, placed_ball);
    for (const key in lines) {
        let line = lines[key];
        let all_balls = line.every((coords) => {
            let tile = tile_from_coords(state, coords);
            return tile.type === "BALL" && tile.owner === ball.owner;
        });
        if (all_balls) {
            return true;
        }
    }
    return false;
};
let check_cubes = (state, placed_ball) => {
    let cubes = get_potential_cubes(placed_ball);
    let ball = tile_from_coords(state, placed_ball);
    for (const key in cubes) {
        let cube = cubes[key];
        let all_balls = cube.length === 4 &&
            cube.every((coords) => {
                let tile = tile_from_coords(state, coords);
                return tile.type === "BALL" && tile.owner === ball.owner;
            });
        if (all_balls) {
            return true;
        }
    }
    return false;
};
let check_recover_bonus = (state, placed_ball) => {
    return check_lines(state, placed_ball) || check_cubes(state, placed_ball);
};
exports.default = {
    get_supports,
    create_coords,
    isToken,
    check_supports,
    get_potential_blockers,
    is_ball_free,
    check_lines,
    check_cubes,
    check_recover_bonus,
    tile_from_coords,
};
