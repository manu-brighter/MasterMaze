<?php

include_once "dbh.inc.php"; 

// Read from Mysql
$map = [];
$id = $_GET['id']; //TODO: special chars check - parameter escaping
$sql = "SELECT * FROM maps WHERE id = $id;";
$result = mysqli_query($conn, $sql);
$resultCheck = mysqli_num_rows($result);

if ($resultCheck > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        
        $map['id'] = $row['id'];
        $map['name'] = $row['name'];
        $map['map'] = $row['map_object'];

    };
} else {
    echo "Map can't load!";
};

echo json_encode($map, true);