// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Part 1: https://youtu.be/aKYlikFAV4k
// Part 2: https://youtu.be/EaZxUCWAjb0
// Part 3: https://youtu.be/jwRT4PCT6RU

// An object to describe a spot in the grid
function Spot(i, j) {
  // Location
  this.i = i;
  this.j = j;

  // f, g, and h values for A*
  this.f = 0;
  this.g = 0;
  this.h = 0;

  // Neighbors
  this.neighbors = [];
  this.isHoverd=false;
  // Where did I come from?
  this.previous = undefined;
  this.visited=false;

  // Am I a wall?
  this.wall = false;
  if (random(1) < 0.2) {
    this.wall = true;
  }
  // if(this.i==3 && this.j>3){
  //   this.wall = true;
  // }
  // if(this.j==3 && this.i>=3){
  //   this.wall = true;
  // }

  // Display me
  this.show = function(col) {
    if (this.wall) {
     noStroke();
      fill('rgb(45, 45, 45)');
    
      rect(this.j * cellDimentions,this.i * cellDimentions, cellDimentions);
      
  

    } else if (col && this.isHoverd==false) {
      strokeWeight(1);
      stroke(50);
      fill(col);
      
      rect(this.j * cellDimentions,this.i * cellDimentions, cellDimentions);
    //  console.log(this.i*cellDimentions,this.j*cellDimentions);
    }
    else if (col && this.isHoverd==true) {
      strokeWeight(6);
      stroke(100,100,15);
      fill(col);
      
      rect(this.j * cellDimentions,this.i * cellDimentions, cellDimentions);
    console.log(this.i*cellDimentions,this.j*cellDimentions);
    }
  };

  // Figure out who my neighbors are
  this.addNeighbors = function(grid) {
    var i = this.i;
    var j = this.j;
    if (i < rows - 1) {
      this.neighbors.push(grid[i + 1][j]);
    }
    if (i > 0) {
      this.neighbors.push(grid[i - 1][j]);
    }
    if (j < cols - 1) {
      this.neighbors.push(grid[i][j + 1]);
    }
    if (j > 0) {
      this.neighbors.push(grid[i][j - 1]);
    }
    // if (i > 0 && j > 0) {
    //   this.neighbors.push(grid[i - 1][j - 1]);
    // }
    // if (i < rows - 1 && j > 0) {
    //   this.neighbors.push(grid[i + 1][j - 1]);
    // }
    // if (i > 0 && j < cols - 1) {
    //   this.neighbors.push(grid[i - 1][j + 1]);
    // }
    // if (i < rows - 1 && j < cols - 1) {
    //   this.neighbors.push(grid[i + 1][j + 1]);
    // }
  }
}
