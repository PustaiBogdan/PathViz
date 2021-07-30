var mazeGrid;

function generate(rows,cols) {
    mazeGrid = new Array(rows);
    for (var i = 0; i < rows; i++) {
        mazeGrid[i] = new Array(cols);

        for (var j = 0; j < cols; j++) {
            mazeGrid[i][j] = "h";
        }
    }

    addOuterWalls(rows,cols);

    var ent = addEntrance(cols);

    addInnerWalls(true, 1, cols - 2, 1, rows - 2, ent);
    for(let i=0;i<cols;i++){
        mazeGrid[rows-1][i]='w';
    }

}

function addOuterWalls(rows,cols) {
    for (var i = 0; i < rows; i++) {
        if (i == 0 || i == (rows - 1)) {
            for (var j = 0; j < cols; j++) {
                mazeGrid[i][j] = "w";
            }
        } else {
            mazeGrid[i][0] = "w";
            mazeGrid[i][cols - 1] = "w";
        }
    }
}

function addEntrance(col) {
  
    var x = randomNumber(1, col - 1);
    mazeGrid[rows-1- 1][x] = "g";
    return x;
}

function addInnerWalls(h, minX, maxX, minY, maxY, gate) {
    if (h) {

        if (maxX - minX < 2) {
            return;
        }

        var y = Math.floor(randomNumber(minY, maxY)/2)*2;
        addHWall(minX, maxX, y);

        addInnerWalls(!h, minX, maxX, minY, y-1, gate);
        addInnerWalls(!h, minX, maxX, y + 1, maxY, gate);
    } else {
        if (maxY - minY < 2) {
            return;
        }

        var x = Math.floor(randomNumber(minX, maxX)/2)*2;
        addVWall(minY, maxY, x);

        addInnerWalls(!h, minX, x-1, minY, maxY, gate);
        addInnerWalls(!h, x + 1, maxX, minY, maxY, gate);
    }
}

function addHWall(minX, maxX, y) {
    var hole = Math.floor(randomNumber(minX, maxX)/2)*2+1;

    for (var i = minX; i <= maxX; i++) {
        if (i == hole) mazeGrid[y][i] = "h";
        else mazeGrid[y][i] = "w";
    }
}

function addVWall(minY, maxY, x) {
    var hole = Math.floor(randomNumber(minY, maxY)/2)*2+1;

    for (var i = minY; i <= maxY; i++) {
        if (i == hole) mazeGrid[i][x] = "h";
        else mazeGrid[i][x] = "w";
    }
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// function display() {
//     document.getElementById("cnt").innerHTML = "";

//     for (var i = 0; i < grid.length; i++) {
//         var output = "<div>";
//         for (var j = 0; j < grid.length; j++) {
//             output += grid[i][j];
//         }
//         output += "</div>";
//         document.getElementById("cnt").innerHTML += output;

//     }

// }

// generate(rows,cols); //r,c
// display();