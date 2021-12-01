<!DOCTYPE html>
<html lang="en">

<head>
    <title>Maze Master</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
        integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous">
    </script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
        integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous">
    </script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
        integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous">
    </script>
    <link rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.4/css/fontawesome.min.css"
        integrity="sha384-jLKHWM3JRmfMU0A5x5AkjWkw/EYfGUAGagvnfryNV3F9VqM98XiIH7VBGVoxVSc7" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.6.0.slim.min.js"
        integrity="sha256-u7e5khyithlIdTpu22PHhENmPcRdFiHRjhAuHcs05RI=" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
    <script src="https://code.jquery.com/ui/1.13.0/jquery-ui.js"></script>
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Concert+One&family=Fredoka+One&family=Road+Rage&display=swap');
    </style>

    <link rel="stylesheet" href="https://code.jquery.com/ui/1.13.0/themes/base/jquery-ui.css">
    <link href="./NewLayout/fontawesome-free-5.15.4-web/css/all.css" rel="stylesheet">
    <link rel="stylesheet" href="./NewLayout/css/NewStyle.css">
    <link rel="stylesheet" href="assets/css/blocks.css">

    <script src="./NewLayout/JS/NewJS.js"></script>
    <script src="./assets/js/map.js"></script>
    <script src="./assets/js/Pathfinding.js"></script>
    <script src="./assets/js/UI.js"></script>
    <script src="./assets/js/generateMap.js"></script>
    <script src="./assets/js/databaseStuff.js"></script>
    <script src="./assets/js/main.js"></script>

</head>

<body>
    <div id="wrapper">
        <!-- Sidebar left -->
        <div id="sidebar-wrapper">
            <div class="save-icons">
                <i class="fas fa-save fa-3x" class="btn"></i>
                <i class="fas fa-trash-alt fa-3x" class="btn" id="trash"></i>
            </div>

            
            <ul class="sidebar-nav" id="maplist">
            <div id="mapdiv">
                <li><a href="#">Map 1</a><img src="./assets/img/Map1.jpg" class="map-picture"><img></li>
                <li><a href="#">Map 2</a><img src="./assets/img/Map2.jpg" class="map-picture"><img></li>
                <li><a href="#">Map 3</a><img src="./assets/img/Map3.jpg" class="map-picture"><img></li>
                </div>
            </ul>

        </div>
    </div>
    </div>

    <div id="wrapper-right">
        <!-- Sidebar right -->
        <div id="sidebar-wrapper-right">

            <ul class="sidebar-nav-right">
                <div class="sliders">
                    <li>
                        <p class="sliderText">Map Width</p>
                    </li>
                    <li>
                        <div id="slider1">
                            <div id="custom-handle1" class="ui-slider-handle"></div>
                        </div>
                    </li>
                    <li>
                        <p class="sliderText">Map Height</p>
                    </li>
                    <li>
                        <div id="slider2">
                            <div id="custom-handle2" class="ui-slider-handle"></div>
                        </div>
                    </li>

                </div>

                <ul class="sidebar-nav-right">

                    <li class="blocktypelist">
                        <div class="blocktypes">

                            <div class="button" id="dirtbutton" onclick="dirtbutton()">
                                <img class="blockbutton" src="./assets/img/dirt.jpg"></img>
                            </div>
                            <div class="button" id="stonebutton" onclick="stonebutton()">
                                <img class="blockbutton" src="./assets/img/stone.jpg"></img>
                            </div>
                            <div class="button" id="startbutton" onclick="startbutton()">
                                <img class="blockbutton" src="./assets/img/start.jpg"></img>
                            </div>
                            <div class="button" id="treasurebutton" onclick="treasurebutton()">
                                <img class="blockbutton" src="./assets/img/treasure.jpg"></img>
                            </div>
                            <div class="buttontext">
                                <p>Dirt</p>
                            </div>
                            <div class="buttontext">
                                <p>Stone</p>
                            </div>
                            <div class="buttontext">
                                <p>Start</p>
                            </div>
                            <div class="buttontext">
                                <p>Treasure</p>
                            </div>
                        </div>
                    </li>
                </ul>
                <ul id="lowerButtons" class="sidebar-nav-right">
                    <li><a href="#" id="ClearButton" onclick="clearMap()">Clear Map</a></li>
                    <li><a href="#" id="ClearFootstepsButton" onclick="clearFootsteps()">Clear Footsteps</a></li>
                    <li><a href="#" id="BorderButton" onclick="setBorders()">Set Map Borders</a></li>
                    <li><a href="#" id="DiagonalFalseButton" onclick="setDiagonalToFalse()">Diagonal False</a></li>
                    <li><a href="#" id="DiagonalTrueButton" onclick="setDiagonalToTrue()">Diagonal True</a></li>
                    <li><a href="#" id="SolveButton" onclick="solveMap()">Solve</a></li>
                </ul>
        </div>

        <!-- Page Content -->
        <div id="page-content-wrapper">
            <nav class="navbar navbar-expand-lg fixed-top">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <i class="fas fa-bars fa-3x" class="btn" id="menu-left-toggle"></i>
                    </li>
                </ul>

                <a class="navbar-brand pull-center" href="#">
                    <p class="title">Maze Master</p>
                    <!--<img src="../assets/img/Logo.JPG" width="auto" height="70" alt="">-->
                </a>

                <ul class="nav navbar-nav navbar-right">
                    <li class="nav-item">
                        <i class="fas fa-map fa-3x" class="btn" id="menu-right-toggle"></i>
                    </li>
                </ul>
            </nav>


            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="map"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
