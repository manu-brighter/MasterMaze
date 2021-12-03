<?php

include_once "dbh.inc.php"; 

$arrResult = [];

// Read from Mysql

$sql = "SELECT * FROM maps;";
$result = mysqli_query($conn, $sql);
$resultCheck = mysqli_num_rows($result);


if ($resultCheck > 0) {
    while ($row = mysqli_fetch_assoc($result)) {

        $arrResult[] = [
            "id" => $row['id'],
            "name" => $row['name'],
            "thumb" => base64_encode($row['thumbnail']),
            "map" => $row['map_object']
        ];
    } 
} else {
    echo "No Maps available!";
}

echo json_encode($arrResult, true);