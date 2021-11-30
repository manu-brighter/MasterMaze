<?php
$arrResult = [];

// Read from Mysql

$sql = "SELECT * FROM maps WHERE 1;";
$result = mysqli_query($conn, $sql);
$resultCheck = mysqli_num_rows($result);

if ($resultCheck > 0) {
    while ($row = mysqli_fetch_assoc($result)) {

        $name = $row['name'];
        $thumb = $row['thumbnail'];
        $map = $row['map_object'];
    
    } 
} else {
    echo "No Maps available!";
}



$id = 1;
$arrResult[$id] = [
    "name" => $name,
    "thumb" => $thumb,
    "data" => $map
];

$id = 2;
$arrResult[$id] = [
    "name" => "",
    "thumb" => "",
    "data" => []
];

$id = 3;
$arrResult[$id] = [
    "name" => "",
    "thumb" => "",
    "data" => []
];

echo json_encode($arrResult, true);