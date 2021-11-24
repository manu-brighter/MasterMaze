//way cost
const straight = 10;
const diagonal = 14;

function getSmallestNeighbours(block, finished_list) {
    let x = block.x
    let y = block.y
    let previous_block
    let smallest_neighbour

    for (const i in finished_list) {
        const current = finished_list[i];
        
        if (isNeighbour(block, current) === true){
            
            console.log(current)

            previous_block = current;
            smallest_neighbour = current.total_distance < previous_block.total_distance ? current : previous_block;
        }

    }

    console.log(smallest_neighbour)
    return smallest_neighbour

};

function getWayback(finished_list) {

    const treasure_block = finished_list[finished_list.length - 2];

    const neighbours = getSmallestNeighbours(treasure_block, finished_list);


    return neighbours

}

function isNeighbour(block1, block2){

    let isNeighbour = false;

    isNeighbour = (block1.x === block2.x - 1 && block1.y === block2.y - 1) ? true : isNeighbour;
    isNeighbour = (block1.x === block2.x + 0 && block1.y === block2.y - 1) ? true : isNeighbour;
    isNeighbour = (block1.x === block2.x + 1 && block1.y === block2.y - 1) ? true : isNeighbour;
    isNeighbour = (block1.x === block2.x - 1 && block1.y === block2.y + 0) ? true : isNeighbour;
    isNeighbour = (block1.x === block2.x + 1 && block1.y === block2.y + 0) ? true : isNeighbour;
    isNeighbour = (block1.x === block2.x + 0 && block1.y === block2.y + 1) ? true : isNeighbour;
    isNeighbour = (block1.x === block2.x + 0 && block1.y === block2.y + 1) ? true : isNeighbour;
    isNeighbour = (block1.x === block2.x + 1 && block1.y === block2.y + 1) ? true : isNeighbour;

    return isNeighbour;
}



// get the neighbouring coordinates as an arrayobject
function getNeighbours(x, y, map_width, map_height, closed_list) {
    let neighbours = [];
    neighbours = addNeighbours({"x": x - 1,"y": y - 1}, map_width, map_height, neighbours, closed_list);
    neighbours = addNeighbours({"x": x + 0,"y": y - 1}, map_width, map_height, neighbours, closed_list);
    neighbours = addNeighbours({"x": x + 1,"y": y - 1}, map_width, map_height, neighbours, closed_list);

    neighbours = addNeighbours({"x": x - 1,"y": y + 0}, map_width, map_height, neighbours, closed_list);
    neighbours = addNeighbours({"x": x + 1,"y": y + 0}, map_width, map_height, neighbours, closed_list);

    neighbours = addNeighbours({"x": x - 0,"y": y + 1}, map_width, map_height, neighbours, closed_list);
    neighbours = addNeighbours({"x": x + 0,"y": y + 1}, map_width, map_height, neighbours, closed_list);
    neighbours = addNeighbours({"x": x + 1,"y": y + 1}, map_width, map_height, neighbours, closed_list);
    return neighbours

};

function addNeighbours(pos, map_width, map_height, neighbours, closed_list) {
    let isValid = true;
    isValid = pos.x < 0 ? false : isValid;
    isValid = pos.y < 0 ? false : isValid;
    isValid = pos.x > map_width ? false : isValid;
    isValid = pos.y > map_height ? false : isValid;

    let isFoundInCloseList = false;
    for(let i in closed_list) {
        if(closed_list[i].x === pos.x && closed_list[i].y === pos.y) {
            isFoundInCloseList = true;
        }
    }

    if(isValid && !isFoundInCloseList) {
        neighbours.push(pos);   
    }

    return neighbours;
}

//calculates the distance between to points in a coordinate grid
function getDistance(from_x, from_y, to_x, to_y) {

    const x = (Math.abs(from_x - to_x));
    const y = (Math.abs(from_y - to_y));

    const smallest = x < y ? x : y;
    const distance = ((smallest) * diagonal) + (Math.abs(x - y) * straight);

    return distance;
};


//calculates the shortest way from point A to point B
function pathFind(map, isDiagonalAllowed) {

    //TODO: implement diagonal false
    //set diagonal walking to false if it isn't specified 
    isDiagonalAllowed = isDiagonalAllowed === "undefined" ? false : true;
    const start = getStartPosFromMap(map);
    const final_list = function searchTreasure(data) {
        let check_block = data.next_block;

        if(check_block.treasure_distance === 0) {
            return data;
        }

        const result = checkBlock({
            map: data.map,
            closed_list: data.closed_list,
            block: {
                x: check_block.x,
                y: check_block.y,
                type: check_block.type
            }
        });

        if(result.next_block === null) {
            return null;
        }

        return searchTreasure(result)
    };

    const result = final_list({
        map: map,
        closed_list: [],
        next_block: {
            x: start.x,
            y: start.y
        }
    })
 
    // Weg Zurück array erstellen
    const wayback_array = getWayback(result.closed_list); 

    // Weg zurück in die Map eintragen

    console.log(result.closed_list)
    return "finished";
}

function checkBlock(data) {
    let map_dimension = getMapDimension(data.map);
    let open_list = getNeighbours(data.block.x, data.block.y, map_dimension.width, map_dimension.height, data.closed_list);
    const start = getStartPosFromMap(data.map);
    const treasure = getTreasurePosFromMap(data.map);
    
    //evaluate neighbours
    for (let i in open_list) {
        const current = open_list[i];

        // TODO: Check if Block is Walkable

        const distance_to_start = getDistance(current.x, current.y, start.x, start.y);
        const distance_to_treasure = getDistance(current.x, current.y, treasure.x, treasure.y);

        data.closed_list.push({
            "x": current.x,
            "y": current.y,
            "total_distance": distance_to_start + distance_to_treasure,
            "treasure_distance": distance_to_treasure,
            "start_distance": distance_to_start
        });
    }

    let next_block = null;
    if (data.closed_list.length > 0 && open_list.length > 0) {
        next_block = data.closed_list.reduce((prev, curr) => {
            return prev.total_distance < curr.total_distance ? prev : curr;
        });
    }

    return {
        closed_list: data.closed_list,
        next_block: next_block
    }
}



//TODO: get start and treasure from map array

function getStartPosFromMap(map) {
    return {
        "x": 2,
        "y": 2
    }
}

function getTreasurePosFromMap(map) {
    return {
        "x": 7,
        "y": 4
    }
}

function getMapDimension(map) {
    return {
        width : 10,
        height : 10
    }
}