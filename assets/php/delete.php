<?php

include_once "dbh.inc.php"; 

// Read from Mysql
$id = $_POST['id'];

$sql = "DELETE FROM maps WHERE id = " . $id . ";";
mysqli_query($conn, $sql);
