<?php
$arrResult = [];

// Read from Mysql

$id = 1;
$arrResult[$id] = [
    "name" => "",
    "thumb" => "",
    "data" => []
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