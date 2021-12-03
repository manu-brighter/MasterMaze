<?php

include_once "dbh.inc.php"; 

// Read from Mysql
$id = $_POST['id'];
$mapname = $_POST['mapname']; //TODO: special chars check - parameter escaping
$map = $_POST['map'];

$sql = "UPDATE maps SET name = '" . $mapname . "', map_object = '" . $map . "', thumbnail = ' ' WHERE id = '" . $id . "';";
echo $sql;
mysqli_query($conn, $sql);
