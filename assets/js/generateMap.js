function generateNewMap(map) {

    clearMapToStone();

    const map_dimension = {
        "height": map.length,
        "width": map[0].length
    };
    const number_of_points = 4;
    const min_snake_length = 2;
    const max_snake_length = 10;
    let snake = []


    let points = getRndmPoints(number_of_points, map_dimension);
    let start = getRndmPoints(1, map_dimension)[0];
    let treasure = getRndmPoints(1, map_dimension)[0];

    for (const i in points) {
        const current_point = points[i];
        snake[i] = getRndmSnake(current_point, min_snake_length, max_snake_length, map_dimension, map);
/*
        console.log(snake[i]);

        for (const s in snake[i]) {
            const current_block = snake[i][s];
        
            // set footsteps pointing in the correct direction
            map[current_block.y][current_block.x] = " ";
        };*/
    };

    map[start.y][start.x] = "&";
    map[treasure.y][treasure.x] = "X";


    loadMap(map);

};


function getRndmPoints(number_of_points, map_dimension) {
    const points = [];
    for (let i = 1; i <= number_of_points; i++) {
        points.push({
            "x": getRndmInteger(0, map_dimension.width - 1),
            "y": getRndmInteger(0, map_dimension.height - 1)
        })
    };
    return points;
};


function getRndmSnake(start, min_snake_length, max_snake_length, map_dimension, map) {

    const x = start.x;
    const y = start.y;
    let valid_neighbours = [];
    const snake = [];
    const snake_length = getRndmInteger(min_snake_length, max_snake_length - 2);
    let block = {
        "x": null,
        "y": null,
        "direction": null
    };

    let next_block = {
        "x": x,
        "y": y,
        "direction": null
    };
    // 1 = right    2 = left    3 & 4 = forward
    // 1 = north    2 = east    3 = south   4 = west
    let direction_number = null;

    snake.push(next_block);
    let neighbours = getNeighbours(next_block, false);

    for (const i in neighbours){
        const block = neighbours[i];

        if (isNeighbourValidForMapGeneration(block, map_dimension, map)){
            valid_neighbours.push(block);
        };

        direction_number = getRndmInteger(1, valid_neighbours.length);
    };

    


    

    for (let i = 1; i <= snake_length; i++) {}


    return snake;
};

function isNeighbourValidForMapGeneration(block, map_dimension, map) {
    const map_width = map_dimension.width;
    const map_height = map_dimension.height;
    const x = block.x;
    const y = block.y;
    let isValid = true;
    let neighbours = getNeighbours(block, false);

    isValid = x < 0 ? false : isValid;
    isValid = y < 0 ? false : isValid;
    isValid = x >= map_width ? false : isValid;
    isValid = y >= map_height ? false : isValid;

    if (isValid){
        for (const i in neighbours){
            const neighbour = neighbours[i];
            if (neighbour.x >= 0 && neighbour.y >= 0 && neighbour.x < map_width && neighbour.y < map_height)
            isValid = getBlockTypeByCoordinates(neighbour.x, neighbour.y, map) === " " ? false : isValid;
        };
    };

    

    return isValid;
};


function getRndmInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
