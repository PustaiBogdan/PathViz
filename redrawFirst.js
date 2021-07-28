function redrawFirst(){
 
  background(225, 225, 225);
  for (var i=0;i<rows;i++){
    for(var j=0; j<cols;j++){
      if(!openSet.includes(grid[i][j]) && !closedSet.includes(grid[i][j]) ){ 
        grid[i][j].show(color(225, 225, 225));
    
      }

    }
  }
  for (var i = 0; i < closedSet.length; i++) {
    closedSet[i].show(color(0, 205, 0));
  }

  for (var i = 0; i < openSet.length; i++) {
    openSet[i].show(color(205, 205, 0));
  }

  // for (var i=3;i<rows;i++){
  //   for(var j=0; j<cols;j++){
  //     grid[i][j].show(color(225, 225, 225));
  //   }
  // }
  start.show(color(200,50,50));
  end.show(color(200,50,50));

  noFill();
  stroke(255);
  strokeWeight(cellDimentions/2);
  beginShape();
  for (var i = 0; i < path.length; i++) {
    vertex(path[i].j *cellDimentions+  cellDimentions/ 2, path[i].i * cellDimentions +cellDimentions / 2);
  }
  endShape();

}
