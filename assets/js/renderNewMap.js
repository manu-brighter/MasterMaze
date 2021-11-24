// sets footsteps pointing to the right direction from the wayback_array
function getNewMap(map, wayback) {

    // declare variabes
    const wayback_reversed = [];
    let next_block = {};

    // reverses the wayback array
    for (let i = wayback.length - 1; i >= 0; i--) {
        wayback_reversed.push(wayback[i]);
    };

    for (const i in wayback_reversed) {
        const current_block = wayback_reversed[i];
        next_block = wayback_reversed[parseInt(i) + 1];

        // only sets footsteps if the block isn't the treasure or start block
        if (current_block.type !== "&" && current_block.type !== "X") {

            // gets the direction to the next block
            let direction = getDirection(next_block, current_block);

            // set footsteps pointing in the correct direction
            map[current_block.y][current_block.x] = direction;
        };
    };
    return map;
};

// checks in which direction the next block is going to be
function getDirection(next_block, current_block){

    let direction = '';

    direction = (next_block.x === current_block.x - 1 && next_block.y === current_block.y - 1) ? 'NW' : direction;
    direction = (next_block.x === current_block.x + 0 && next_block.y === current_block.y - 1) ? 'N' : direction;
    direction = (next_block.x === current_block.x + 1 && next_block.y === current_block.y - 1) ? 'NE' : direction;
    direction = (next_block.x === current_block.x - 1 && next_block.y === current_block.y + 0) ? 'W' : direction;
    direction = (next_block.x === current_block.x + 1 && next_block.y === current_block.y + 0) ? 'E' : direction;
    direction = (next_block.x === current_block.x - 1 && next_block.y === current_block.y + 1) ? 'SW' : direction;
    direction = (next_block.x === current_block.x + 0 && next_block.y === current_block.y + 1) ? 'S' : direction;
    direction = (next_block.x === current_block.x + 1 && next_block.y === current_block.y + 1) ? 'SE' : direction;

    return direction;
};
