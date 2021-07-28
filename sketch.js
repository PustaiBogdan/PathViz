var deleteWalls=false;
var pause=false;
var selectStartPoint=false;

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
  var cellDimentions= 35;
  // How many columns and cols?
  var rows = 10;
  var cols = 20;
  var w=cols*cellDimentions, h=rows*cellDimentions;

  // This will be the 2D array

  
  // Start and end
  var start,end;

  
  // Width and height of each cell of grid

  var grid = new Array(rows);
  
  // Open and closed set
  var openSet = [];
  var closedSet = [];

  
  // The road taken
  var path = [];
  
  function setup() {

    createCanvas(w, h);
   

    // Grid cell size

  
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
    justStarted=false;
    frameRate(20);
    console.log(justStarted);

    loop();
  }
  
  


  function draw(e) {
    if (keyIsPressed === true && key=='q'){
      deleteWalls=true;
    } else{
      deleteWalls=false;
    }
    
 
    AStarSerch(begin);
    if(selectStartPoint==true){
      moveStartPoint();
    }
    
    
  }

  function mousePressed(){
 
    let x_mouse=floor(mouseY/cellDimentions);
    let y_mouse=floor(mouseX/cellDimentions);

    if(x_mouse<cols && y_mouse<rows && x_mouse>=0 && y_mouse>=0)
{    grid[x_mouse][y_mouse].wall=!grid[x_mouse][y_mouse].wall;}

    redrawFirst();
    }

var currentXMousePos,currentYMousePos;
var currentMousePos = [];
var currentMousePosSelect = [];
    function mouseDragged(){
      
      
      let x_mouse=floor(mouseY/cellDimentions);
      let y_mouse=floor(mouseX/cellDimentions );

      if(mouseButton === LEFT && keyIsPressed === false){
      currentMousePos.push(x_mouse,y_mouse);
      if(currentMousePos.length>=4){
        currentMousePos.splice(-(currentMousePos.length-2),2);
      }
      // console.log(currentMousePos[currentMousePos.length-1]);
      //console.log(currentMousePos[currentMousePos.length-1],currentMousePos[currentMousePos.length-2]);
      if(x_mouse<rows && y_mouse<cols && x_mouse>=0 && y_mouse>=0)    {
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
    if(x_mouse<rows && y_mouse<cols && x_mouse>=0 && y_mouse>=0)    {
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
      
function clearTheCanvas(){

  const context = canvas.getContext('2d');
  
  begin=false;

  grid = new Array(rows);
  openSet = [];
  closedSet = [];
  path = [];
  context.clearRect(0, 0, canvas.width, canvas.height);
  setup();

  
}

var variabila=false;

function moveStartPoint(){
  selectStartPoint=true;
    let x_mouse=floor(mouseY/cellDimentions);
    let y_mouse=floor(mouseX/cellDimentions);


     currentMousePosSelect.push(y_mouse,x_mouse);
      if(currentMousePosSelect.length>=6){
        currentMousePosSelect.splice(0,2);
      }
  console.log(x_mouse<rows && y_mouse<cols && x_mouse>=0 && y_mouse>=0 &&  currentMousePosSelect[0]>=0 && currentMousePosSelect[1]>=0 && currentMousePosSelect[1]<rows  && currentMousePosSelect[1]<cols);
    if(x_mouse<rows && y_mouse<cols && x_mouse>=0 && y_mouse>=0)    {
      
    

      if(currentMousePosSelect[0]>=0  && currentMousePosSelect[0]<cols && currentMousePosSelect[1]>=0 && currentMousePosSelect[1]<rows  && currentMousePosSelect[1]<cols)
        {//  if(x_mouse!=currentMousePosSelect[currentMousePosSelect.length-4] || y_mouse!= currentMousePosSelect[currentMousePosSelect.length-3])
        //    grid[x_mouse][y_mouse].isHoverd=true;

        // grid[currentMousePosSelect[currentMousePosSelect.length-4]][currentMousePosSelect[currentMousePosSelect.length-3]].isHoverd=false;
        //    grid[currentMousePosSelect[currentMousePosSelect.length-2]][currentMousePosSelect[currentMousePosSelect.length-1]].isHoverd=true;
        
        grid[currentMousePosSelect[1]][currentMousePosSelect[0]].isHoverd=false;
        grid[currentMousePosSelect[3]][currentMousePosSelect[2]].isHoverd=true;
        //    grid[currentMousePosSelect[currentMousePosSelect.length-2]][currentMousePosSelect[currentMousePosSelect.length-1]].isHoverd=true;
      
        console.log(currentMousePosSelect[3], currentMousePosSelect[2]);
    
        redrawFirst();
        
      }
   }
    
}
// function mouseOver(){
//   console.log("AAA");
// }
