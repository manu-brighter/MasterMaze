<?php

// ci cd

$dbServername = "localhost";
$dbUsername = "root";
$dbPassword = "";
$dbName = "mazemaster";

/*
$dbServername = "rushpupp.mysql.db.internal";
$dbUsername = "rushpupp_manu";
$dbPassword = "FZoFhaDQ+ZNFKP8JtW*H";
$dbName = "rushpupp_manu";
*/

$conn = mysqli_connect($dbServername, $dbUsername, $dbPassword, $dbName);