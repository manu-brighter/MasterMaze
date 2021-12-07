<?php

include_once "dbh.inc.php"; 

// Read from Mysql
$map = [];
$id = $_GET['id'];

if ($id === "null"){
    $sql = "SELECT * FROM maps LIMIT 1;";
} else {
    $sql = "SELECT * FROM maps WHERE id = $id;";
}


$result = mysqli_query($conn, $sql);
$resultCheck = mysqli_num_rows($result);

if ($resultCheck > 0) {
    $row = mysqli_fetch_assoc($result);
    $map['id'] = $row['id'];
    $map['name'] = $row['name'];
    $map['map'] = $row['map_object'];
} else {
    ;
};

echo json_encode($map, true);