var pos,posx,posy;
var deleteWalls=false;
// Function to delete element from the array
function removeFromArray(arr, elt) {
    // Could use indexOf here instead to be more efficient
    for (var i = arr.length - 1; i >= 0; i--) {
      if (arr[i] == elt) {
        arr.splice(i, 1);
      }
    }
  }
  
  var begin=false;
  // An educated guess of how far it is between two points
  function heuristic(a, b) {
     var d = dist(a.i, a.j, b.i, b.j);
    // var d = abs(a.i - b.i) + abs(a.j - b.j);
    return d;
  }
  
  // How many columns and cols?
  var rows = 10;
  var cols = 10;
  
  // This will be the 2D array
  var grid = new Array(cols);
  
  // Open and closed set
  var openSet = [];
  var closedSet = [];
  
  // Start and end
  var start;
  var end;
  
  // Width and height of each cell of grid
  var w=600, h=600;
  var cellWidth=w/cols, cellHeight=h/rows;
  console.log(cellHeight,cellWidth);

  
  // The road taken
  var path = [];
  
  function setup() {

    createCanvas(w, h);
    var context = canvas.getContext("2d");


    // Grid cell size
    w = width / rows;
    h = height / cols;
  
    // Making a 2D array
    for (var i = 0; i < rows; i++) {
      grid[i] = new Array(cols);
    }
  
    for (var i = 0; i < rows; i++) {
      for (var j = 0; j < cols; j++) {
        grid[i][j] = new Spot(i, j);
        
      }
    }
  
    // All the neighbors
    for (var i = 0; i < rows; i++) {
      for (var j = 0; j < cols; j++) {
        grid[i][j].addNeighbors(grid);
      }
    }
  
    // Start and end
    start = grid[0][0];
    end = grid[rows - 1][cols-1];
    start.wall = false;
    end.wall = false;
  
    // openSet starts with beginning only

    openSet.push(start);
    redrawFirst();

    frameRate(20);
  }
  
  



  function draw(e) {
    if (keyIsPressed === true && key=='q'){
      deleteWalls=true;
    } else{
      deleteWalls=false;
    }
    
 
    AStarSerch(begin);

  }

  function mousePressed(){

    let x_mouse=floor(mouseX/cellWidth);
    let y_mouse=floor(mouseY/cellHeight);

    if(x_mouse<cols && y_mouse<rows && x_mouse>=0 && y_mouse>=0)
{    grid[x_mouse][y_mouse].wall=!grid[x_mouse][y_mouse].wall;}


    redrawFirst();
    }

var currentXMousePos,currentYMousePos;
var currentMousePos = [];
    function mouseDragged(){
      
      
      let x_mouse=floor(mouseX/cellWidth);
      let y_mouse=floor(mouseY/cellHeight);

      if(mouseButton === LEFT && keyIsPressed === false){
      currentMousePos.push(x_mouse,y_mouse);
      if(currentMousePos.length>=4){
        currentMousePos.splice(-(currentMousePos.length-2),2);
      }
      // console.log(currentMousePos[currentMousePos.length-1]);
      //console.log(currentMousePos[currentMousePos.length-1],currentMousePos[currentMousePos.length-2]);
      if(x_mouse<cols && y_mouse<rows && x_mouse>=0 && y_mouse>=0)    {
        // currentXMousePos=x_mouse;
        // currentYMousePos=y_mouse;
      
         if(x_mouse!=currentMousePos[currentMousePos.length-4] || y_mouse!= currentMousePos[currentMousePos.length-3])
           grid[x_mouse][y_mouse].wall=true;
    }

     
      redrawFirst();
  }
  if(mouseButton === LEFT && deleteWalls==true){
    currentMousePos.push(x_mouse,y_mouse);
    
    // console.log(currentMousePos[currentMousePos.length-1]);
    //console.log(currentMousePos[currentMousePos.length-1],currentMousePos[currentMousePos.length-2]);
    if(x_mouse<cols && y_mouse<rows && x_mouse>=0 && y_mouse>=0)    {
      // currentXMousePos=x_mouse;
      // currentYMousePos=y_mouse;
    
       if(x_mouse!=currentMousePos[currentMousePos.length-4] || y_mouse!= currentMousePos[currentMousePos.length-3])
         grid[x_mouse][y_mouse].wall=false;
  }
  if(currentMousePos.length>=4){
    currentMousePos.splice(-(currentMousePos.length-2),2);
  }
    
    redrawFirst();
}
    }
  
    // function keyPressed(){
    //   if(key=='q'){
    //     deleteWalls=true;
    //     console.log("true")
    //   }else{
    //     deleteWalls=false;
    //     console.log("false");
    //   }
    // }

 