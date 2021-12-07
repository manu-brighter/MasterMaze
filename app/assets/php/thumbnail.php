<?php

include_once "dbh.inc.php"; 

// Read from Mysql
$id = $_GET['id'];
$sql = "SELECT * FROM maps WHERE id = $id;";

$result = mysqli_query($conn, $sql);
$resultCheck = mysqli_num_rows($result);
if ($resultCheck === 0) { return; }

$row = mysqli_fetch_assoc($result);
$map = json_decode($row['map_object']);


header("Content-type: image/png");
header("Cache-Control: no-cache");

$dirt = '../img/dirtcursor.png';
$stone = '../img/stonecursor.png';
$start = '../img/startcursor.png';
$treasure = '../img/treasurecursor.png';

$dirt = imagecreatefromstring(file_get_contents($dirt));
$stone = imagecreatefromstring(file_get_contents($stone));
$start = imagecreatefromstring(file_get_contents($start));
$treasure = imagecreatefromstring(file_get_contents($treasure));

$multiplier = 10;

$width = count($map[0]) * $multiplier;
$height = count($map) * $multiplier;

$blocksize = $height / count($map);

$dirt = imagescale($dirt, $blocksize, $blocksize);
$stone = imagescale($stone, $blocksize, $blocksize);
$start = imagescale($start, $blocksize, $blocksize);
$treasure = imagescale($treasure, $blocksize, $blocksize);

$im = imagecreate($width, $height);
$background_color = imagecolorallocate($im, 0, 0, 0);

for ($i = 0; $i < count($map); ++$i) {
    $maprow = $map[$i];

    for ($s = 0; $s < count($maprow); ++$s) {
        $block = $maprow[$s];

        if ($block === " ") {
            imagecopymerge($im, $dirt, $blocksize * $s, $blocksize * $i, 0, 0, $blocksize, $blocksize, 100);
        } elseif ($block === "#"){
            imagecopymerge($im, $stone, $blocksize * $s, $blocksize * $i, 0, 0, $blocksize, $blocksize, 100);
        } elseif ($block === "&"){
            imagecopymerge($im, $start, $blocksize * $s, $blocksize * $i, 0, 0, $blocksize, $blocksize, 100);
        } elseif ($block === "X"){
            imagecopymerge($im, $treasure, $blocksize * $s, $blocksize * $i, 0, 0, $blocksize, $blocksize, 100);
        };
        
    };
};

imagepng($im);
imagedestroy($im);
