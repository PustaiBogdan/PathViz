 // An educated guess of how far it is between two points
 function heuristic(a, b) {
  var d = dist(a.i, a.j, b.i, b.j);
 // var d = abs(a.i - b.i) + abs(a.j - b.j);
 return d;
}


function AStarSerch(begin){
  if(begin)
  {if (openSet.length > 0) {
    // Best next option
    var winner = 0;
    for (var i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[winner].f) {
        winner = i;
      }
    }
    var current = openSet[winner];
   

    // Did I finish?
    if (current === end) {
      noLoop();
      console.log('DONE!');
    }

    // Best option moves from openSet to closedSet
    removeFromArray(openSet, current);
    closedSet.push(current);

    // Check all the neighbors
    var neighbors = current.neighbors;
    for (var i = 0; i < neighbors.length; i++) {
      var neighbor = neighbors[i];

      // Valid next spot?
      if (!closedSet.includes(neighbor) && !neighbor.wall) {
        var tempG = current.g + heuristic(neighbor, current);


        // Is this a better path than before?
        var newPath = false;
        if (openSet.includes(neighbor)) {
          if (tempG < neighbor.g) {
            neighbor.g = tempG;
            newPath = true; 
       
          }
        } else {
          neighbor.g = tempG;
          newPath = true;
          openSet.push(neighbor);
     
        }

        // Yes, it's a better path
        if (newPath) {
          neighbor.h = heuristic(neighbor, end);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.previous = current;
        }
      }
    }
    // Uh oh, no solution
  } else {
    console.log('no solution');
    noLoop();
    return;
  }

  // Draw current state of everything

background(225, 225, 225);


  for (var i = 0; i < closedSet.length; i++) {
    closedSet[i].show(color(0, 205, 0));
  }

  for (var i = 0; i < openSet.length; i++) {
    openSet[i].show(color(205, 205, 0));
  }
  for (var i=0;i<rows;i++){
    for(var j=0; j<cols;j++){
      if(!openSet.includes(grid[i][j]) && !closedSet.includes(grid[i][j])){
        grid[i][j].show(color(225, 225, 225));
        console.log(grid[i][j].wall);
      }

    }
  }
  start.show(color(200,50,50));
  end.show(color(200,50,50));

  // Find the path by working backwards
  path = [];
  var temp = current;
  path.push(temp);
  while (temp.previous) {
    path.push(temp.previous);
    temp = temp.previous;
  }

  // for (var i = 0; i < path.length; i++) {
  // path[i].show(color(0, 0, 255));
  // }

  // Drawing path as continuous line
  noFill();
  stroke(255);
  strokeWeight(cellDimentions/2);
  beginShape();
  for (var i = 0; i < path.length; i++) {
    vertex(path[i].j *cellDimentions+  cellDimentions/ 2, path[i].i * cellDimentions +cellDimentions / 2);
   
  }
  endShape();
  if(current === end){
    noFill();
    stroke(205, 205, 0,120);
    strokeWeight(cellDimentions/2);
    beginShape();
    for (var i = 0; i < path.length; i++) {
      vertex(path[i].j *cellDimentions+  cellDimentions/ 2, path[i].i * cellDimentions +cellDimentions / 2);
    }
    endShape();
  }

  // beginShape();
  // stroke(20);
  // for (var i = 0; i < path.length; i++) {
  //   vertex(path[i].i * w  + w / 2, path[i].j * h + h / 2);
  // }
  // endShape();
}
}

function startAStar(){
  begin=!(begin);
  let buttonText=document.getElementById("startAStar");
  if(begin==true){
    buttonText.innerHTML="Stop A* serch";
  }
  if(begin==false){
    buttonText.innerHTML="Start A* serch";
  }
console.log(grid);
}
