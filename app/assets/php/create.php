<?php

include_once "dbh.inc.php"; 

// Read from Mysql
$map = $_POST['map'];
$mapname = $_POST['mapname']; //TODO: special chars check - parameter escaping

$sql = "INSERT INTO maps (name, map_object, thumbnail) VALUES ('".$mapname."', '".$map."', ' ');";
mysqli_query($conn, $sql);
