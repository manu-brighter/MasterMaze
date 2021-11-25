function generateNewMap(map) {

    const map_height = map.length;
    const map_width = map[0].length;
    const number_of_points = 4;
    const max_snake_length = 10;


    let points = getRndmPoints(number_of_points, map_height, map_width);

    console.log(points);

    for (const i in points){
        const current_point = points[i];
        let snake = getRndmSnake(current_point, max_snake_length);
    }


    loadMap(map);

};


function getRndmPoints(number_of_points, map_height, map_width) {
    const points = [];
    for (let i = 1; i <= number_of_points; i++) {
        points.push({
            "x": getRndmInteger(0, map_width - 1),
            "y": getRndmInteger(0, map_height - 1)
        })
    };
    return points;
};


function getRndmSnake(start, max_snake_length) {

    const x = start.x;
    const y = start.y;
    const snake = []
    const snake_length = getRndmInteger(1, max_snake_length - 2);
    let next_block = {
        "x": x,
        "y": y,
        "parent": null
    };

    // 1 = right    2 = left    3 & 4 = forward
    // 1 = north    2 = east    3 = south   4 = west
    let direction_number = getRndmInteger(1, 4);

    snake.push(next_block);

    next_block = direction_number === 1 ? {"x": x, "y": y - 1, "direction": "north"} : next_block;
    next_block = direction_number === 2 ? {"x": x + 1, "y": y, "direction": "east"} : next_block;
    next_block = direction_number === 3 ? {"x": x, "y": y + 1, "direction": "south"} : next_block;
    next_block = direction_number === 4 ? {"x": x - 1, "y": y, "direction": "west"} : next_block;

    snake.push(next_block);

    for (let i = 1; i <= snake_length; i++) {
        direction_number = getRndmInteger(1, 4);

        if (next_block.direction)
        next_block = direction_number === 1 ? {"x": next_block.x, "y": next_block.y, "direction": "straight"} : next_block;
        next_block = direction_number === 2 ? {"x": next_block.x, "y": next_block.y, "direction": "left"} : next_block;
        next_block = direction_number === 3 ? {"x": next_block.x, "y": next_block.y, "direction": "right"} : next_block;
        snake.push(next_block);
    
    };


};



function getRndmInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};