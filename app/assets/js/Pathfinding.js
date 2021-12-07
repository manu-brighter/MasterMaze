// way cost
const straight = 10;
const diagonal = 14;


// calculates the shortest way from point A to point B in a coordinate grid
function pathFind(map, isDiagonalAllowed) {

    // set diagonal walking to false if it isn't specified 
    isDiagonalAllowed = isDiagonalAllowed === "undefined" ? false : isDiagonalAllowed;

    // if there is no start or finish, an error message displays
    if (typeof getStartPosFromMap(map) === "undefined") {
        alert("Keine Start Position gefunden");
        return;
    };

    if (typeof getTreasurePosFromMap(map) === "undefined") {
        alert("Keine Schatz Position gefunden!");
        return;
    };

    // declare variabes: start & closed_list
    const start = getStartPosFromMap(map);
    const closed_list = [];

    // loop function with data till treasure is found or no more block is scanable (recursion)    
    const searchTreasure = function (data) {

        let block = data.block;

        // if treasure distance is 0, treasure should be found: leave the loop and return data
        if (block.treasure_distance === 0) {
            return data;
        };

        // calculate the neighbours of the current block and sage the data in calculated_blocks
        let calculated_blocks = calculateNeighbours({
            "isDiagonalAllowed": data.isDiagonalAllowed,
            "map": data.map,
            "closed_list": data.closed_list,
            "block": {
                "x": block.x,
                "y": block.y,
                "is_used": block.is_used,
                "type": block.type,
                "parent": block.parent,
                "total_distance": block.total_distance,
                "treasure_distance": block.distance_to_treasure,
                "distance_from_start": block.distance_from_start
            }
        });

        // get smallest blocks that weren't used before from the current version of the closed_list
        let smallest_blocks = getSmallestBlocks(calculated_blocks);


        // TODO: update block doesn't work as it should

        /*
        // if the newly calculated total_distance from the smallest block is smaller than before, update the data from the block
        for (const i in smallest_blocks) {
            const current_smallest_block = smallest_blocks[i];

            for (const i in calculated_blocks.closed_list) {
                const current_block = calculated_blocks.closed_list[i];

                if (current_block.x === current_smallest_block.x && current_block.y === current_smallest_block.y) {
                    if (current_block.total_distance < current_smallest_block.total_distance) {
                        calculated_blocks.closed_list[i] = calculateBlock(current_block, calculated_blocks.closed_list, calculated_blocks.map);
                        calculated_blocks.closed_list[i].is_used = false;
                    };
                };
            };
        };
        */

        // get the smallest blocks again from the updated closed_list


        //open a recursion for every smallest block, untill the type of a block is X and therefore the treasure
        for (const i in smallest_blocks) {
            const current_smallest_block = smallest_blocks[i];

            current_smallest_block.is_used = true;
            calculated_blocks.block = current_smallest_block;

            if (calculated_blocks.block.x === 7 && calculated_blocks.block.y === 2) {
                //debugger;
            };

            calculated_blocks = searchTreasure(calculated_blocks);
        };

        return calculated_blocks;
    };

    // first time calling the recursive function with the start coordinates
    const result = searchTreasure({
        "isDiagonalAllowed": isDiagonalAllowed,
        "map": map,
        "closed_list": closed_list,
        "block": {
            "x": start.x,
            "y": start.y,
            "type": "&",
            "is_used": true,
            "parent": null,
            "total_distance": null,
            "treasure_distance": null,
            "distance_from_start": 0
        }
    });

    // get the wayback from the result of searchTreasure
    const wayback_array = getWayback(result);

    //if there is no way back, alert that there is no way back
    if (wayback_array === null) {
        alert("Kein Durchgang gefunden!");
        return;
    };

    //function return the way back
    return wayback_array;

};

// gets the way back as an array
function getWayback(data) {

    // declaring variables
    const start = getStartPosFromMap(data.map);
    const closed_list = data.closed_list;
    const treasure_block = closed_list.find(pos => pos.type === "X");
    let wayback_array = [];

    // if the last block isn't the treasure block, return null
    if (treasure_block.type !== "X") {
        return null;
    }

    // push the first block in the array
    wayback_array.push(treasure_block);

    // recursive function, until start block is found
    const calculateWayback = function (wayback_array, block, closed_list, start) {

        // the startblock is found, push the startblock in the array and return it
        if (block.parent.x === start.x && block.parent.y === start.y) {
            wayback_array.push({
                "x": start.x,
                "y": start.y,
                "type": "&",
                "parent": null,
                "total_distance": null,
                "treasure_distance": null,
                "distance_from_start": 0
            });
            return wayback_array;
        };

        // get the parent block from the current block and push it
        next_block = closed_list.find(pos => pos.x === block.parent.x && pos.y === block.parent.y);
        wayback_array.push(next_block);

        // call the function again with the parent from the previous block
        return calculateWayback(wayback_array, next_block, closed_list, start);

    };

    // call the recursive function for the first time
    const result = calculateWayback(wayback_array, treasure_block, closed_list, start);

    // return the wayback array as result
    return result;

};

// calculates the values of all neighbours from a specific block and adds them to the closed_list if they are walkable
function calculateNeighbours(data) {
    let open_list = addNeighbours(data.block, data.map, data.isDiagonalAllowed);
    const treasure = getTreasurePosFromMap(data.map);
    const start = getStartPosFromMap(data.map);

    // adding blocks from open_list to closed_list
    for (const i in open_list) {
        const current_block = open_list[i];

        // Check if Block is Walkable
        if (current_block.type === '#') {
            continue;
        };

        // get distances for each block
        const distance_from_start = getDistanceFromStart(current_block, data.closed_list, start);
        const distance_to_treasure = getDistanceToTreasure(current_block, treasure);

        // add the block to the closed list, if it isn't already in there
        if (isInClosedList(data.closed_list, current_block, start) === false) {
            data.closed_list.push({
                "x": current_block.x,
                "y": current_block.y,
                "type": current_block.type,
                "is_used": current_block.is_used,
                "parent": current_block.parent,
                "total_distance": distance_from_start + distance_to_treasure,
                "treasure_distance": distance_to_treasure,
                "distance_from_start": distance_from_start
            });
        };
    };
    return data;
};

// get distances of a single block
function calculateBlock(block, closed_list, map) {
    const treasure = getTreasurePosFromMap(map);
    const start = getStartPosFromMap(map);

    const distance_from_start = getDistanceFromStart(block, closed_list, start);
    const distance_to_treasure = getDistanceToTreasure(block, treasure);

    return {
        "x": block.x,
        "y": block.y,
        "type": block.type,
        "parent": block.parent,
        "total_distance": distance_from_start + distance_to_treasure,
        "treasure_distance": distance_to_treasure,
        "distance_from_start": distance_from_start
    };
};

// check if block is in closed_list
function isInClosedList(closed_list, block, start) {
    let isInList = false;

    // if the block is the start block, return true anyways
    if (block.x === start.x && block.y === start.y) {
        return true;
    };

    // if the block is in the closed_list, isInList is true
    for (const i in closed_list) {
        const current_block = closed_list[i];

        isInList = current_block.x === block.x && current_block.y === block.y ? true : isInList;

    };

    // return boolean
    return isInList;
};

// returns the smallest blocks from the closed_list
function getSmallestBlocks(data) {
    const smallest_blocks = [];
    const map_dimension = getMapDimension(data.map);


    // get the smallest total_distance number
    let has_smallest = false;
    let smallest_total_distance = (map_dimension.width * map_dimension.height) * 14;
    for (const i in data.closed_list) {
        const current_block = data.closed_list[i];
        if (current_block.total_distance < smallest_total_distance && !current_block.is_used) {
            smallest_total_distance = current_block.total_distance;
            has_smallest = true;
        };
    };

    // Add all blocks with smallest total_disctance to smallest Array
    if (has_smallest) {
        for (const i in data.closed_list) {
            const current_block = data.closed_list[i];
            if (current_block.total_distance === smallest_total_distance && !current_block.is_used) {
                smallest_blocks.push(current_block);
            };
        };
    };
    return smallest_blocks;
};

// checks all neighbours if they are valid and add the valid ones to an arrayobject
function addNeighbours(block, map, isDiagonalAllowed) {

    const neighbours = getNeighbours(block, isDiagonalAllowed);
    let valid_neighbours = [];

    for (const i in neighbours) {
        const current_neighbour = neighbours[i];
        valid_neighbours = isNeighbourValid(current_neighbour, map, valid_neighbours);
    };
    return valid_neighbours;
};

// checks if the Neighbour is in the map boundaries and return an array with all valid neighbours
function isNeighbourValid(block, map, valid_neighbours) {
    const map_dimension = getMapDimension(map);
    const map_width = map_dimension.width;
    const map_height = map_dimension.height;
    const x = block.x;
    const y = block.y;
    let isValid = true;

    isValid = x < 0 ? false : isValid;
    isValid = y < 0 ? false : isValid;
    isValid = x >= map_width ? false : isValid;
    isValid = y >= map_height ? false : isValid;

    if (isValid) {
        // gets the blocktype
        block.type = getBlockTypeByCoordinates(x, y, map);
        valid_neighbours.push(block);
    };
    return valid_neighbours;
};




// gets the waycost from the start point for the current block
function getDistanceFromStart(block, closed_list, start) {

    let distance = 0;

    // if the parent is the start block, start with waycost 0
    if (block.parent.x === start.x && block.parent.y === start.y) {

        // add waycost
        if (block.x === block.parent.x || block.y === block.parent.y) {
            distance = straight;
        } else {
            distance = diagonal;
        };

    } else {
        // search for the parent in the closed_list to get the previous waycost 
        const parent = closed_list.find(pos => pos.x === block.parent.x && pos.y === block.parent.y);

        // add waycost
        if (block.x === parent.x || block.y === parent.y) {
            distance = parent.distance_from_start + straight;
        } else {
            distance = parent.distance_from_start + diagonal;
        };
    };

    // return waycost
    return distance;
};

// get the airline distance to the treasure block
function getDistanceToTreasure(block, treasure) {
    const x = (Math.abs(block.x - treasure.x));
    const y = (Math.abs(block.y - treasure.y));

    const smallest = x < y ? x : y;
    const distance = ((smallest) * diagonal) + (Math.abs(x - y) * straight);

    return distance;
};

// gets the block type from the map array
function getBlockTypeByCoordinates(x, y, map) {
    return map[y][x];
};

// search for a block, just using it's type
function getBlockByType(map, type) {
    for (const i in map) {
        const row = map[i];

        for (const s in row) {
            const column = row[s];

            if (column === type) {
                return {
                    "x": parseInt(s),
                    "y": parseInt(i)
                };
            };
        };
    };
};

// get start position
function getStartPosFromMap(map) {
    return getBlockByType(map, "&");
};

// get treasure position
function getTreasurePosFromMap(map) {
    return getBlockByType(map, "X");
};

// get map dimensions
function getMapDimension(map) {

    const height = map.length;
    const width = map[0].length;

    return {
        "width": width,
        "height": height
    };
};

// returns all neighbouring blocks as arrayobject
function getNeighbours(block, isDiagonalAllowed) {

    const x = block.x;
    const y = block.y;
    const neighbours = [];

    const parent = {
        "x": x,
        "y": y
    };


    if (isDiagonalAllowed) {
        neighbours.push({
            "x": x - 1,
            "y": y - 1,
            "type": null,
            "is_used": false,
            "parent": parent,
            "total_distance": null,
            "treasure_distance": null,
            "distance_from_start": null
        });
    };
    neighbours.push({
        "x": x + 0,
        "y": y - 1,
        "type": null,
        "is_used": false,
        "parent": parent,
        "total_distance": null,
        "treasure_distance": null,
        "distance_from_start": null
    });
    if (isDiagonalAllowed) {
        neighbours.push({
            "x": x + 1,
            "y": y - 1,
            "type": null,
            "is_used": false,
            "parent": parent,
            "total_distance": null,
            "treasure_distance": null,
            "distance_from_start": null
        });
    };
    neighbours.push({
        "x": x - 1,
        "y": y + 0,
        "type": null,
        "is_used": false,
        "parent": parent,
        "total_distance": null,
        "treasure_distance": null,
        "distance_from_start": null
    });
    neighbours.push({
        "x": x + 1,
        "y": y + 0,
        "type": null,
        "is_used": false,
        "parent": parent,
        "total_distance": null,
        "treasure_distance": null,
        "distance_from_start": null
    });
    if (isDiagonalAllowed) {
        neighbours.push({
            "x": x - 1,
            "y": y + 1,
            "type": null,
            "is_used": false,
            "parent": parent,
            "total_distance": null,
            "treasure_distance": null,
            "distance_from_start": null
        });
    };
    neighbours.push({
        "x": x + 0,
        "y": y + 1,
        "type": null,
        "is_used": false,
        "parent": parent,
        "total_distance": null,
        "treasure_distance": null,
        "distance_from_start": null
    });
    if (isDiagonalAllowed) {
        neighbours.push({
            "x": x + 1,
            "y": y + 1,
            "type": null,
            "is_used": false,
            "parent": parent,
            "total_distance": null,
            "treasure_distance": null,
            "distance_from_start": null
        });
    };

    return neighbours;
};
