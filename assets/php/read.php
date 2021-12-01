<?php

include_once "dbh.inc.php"; 

// Read from Mysql
$map = [];
$id = $_POST['id'];
$sql = "SELECT * FROM maps WHERE id = 1;";
$result = mysqli_query($conn, $sql);
$resultCheck = mysqli_num_rows($result);

if ($resultCheck > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        
        
        $map['name'] = $row['name'];
        $map['map'] = $row['map_object'];

    };
} else {
    echo "Map can't load!";
};

echo json_encode($map, true);