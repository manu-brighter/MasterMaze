<?php
$arrResult = [];

// Read from Mysql

$sql = "SELECT * FROM maps WHERE 1;";
$result = mysqli_query($conn, $sql);
$resultCheck = mysqli_num_rows($result);
$id = 0;

if ($resultCheck > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        $id++;

        $arrResult[$id] = [
            "name" => $row['name'],
            "thumb" => base64_encode($row['thumbnail']),
        ];
    } 
} else {
    echo "No Maps available!";
}

# echo json_encode($arrResult, true);