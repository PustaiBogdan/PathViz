var deleteWalls=false;
var pause=false;
var selectStartPoint=false;
var selectEndPoint=false;
var procet=20;
var allowRandomWalls=true;
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
  // function heuristic(a, b) {
  //    var d = dist(a.i, a.j, b.i, b.j);
  //   // var d = abs(a.i - b.i) + abs(a.j - b.j);
  //   return d;
  // }
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
  
    console.log(grid);
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
    
    if(selectEndPoint==true){
      moveEndPoint();
    }
    // if(mouseButton === LEFT)
    // {
      
    // }

    
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


function moveStartPoint(){
  selectStartPoint=true;
  selectEndPoint=false;
    let x_mouse=floor(mouseY/cellDimentions);
    let y_mouse=floor(mouseX/cellDimentions);


     currentMousePosSelect.push(y_mouse,x_mouse);
      if(currentMousePosSelect.length>=6){
        currentMousePosSelect.splice(0,2);
      }
 
    if(x_mouse<rows && y_mouse<cols && x_mouse>=0 && y_mouse>=0)    {
      
    

      if(currentMousePosSelect[0]>=0  && currentMousePosSelect[0]<cols && currentMousePosSelect[1]>=0 && currentMousePosSelect[1]<rows  && currentMousePosSelect[1]<cols)
        {//  if(x_mouse!=currentMousePosSelect[currentMousePosSelect.length-4] || y_mouse!= currentMousePosSelect[currentMousePosSelect.length-3])
        //    grid[x_mouse][y_mouse].isHoverd=true;

        // grid[currentMousePosSelect[currentMousePosSelect.length-4]][currentMousePosSelect[currentMousePosSelect.length-3]].isHoverd=false;
        //    grid[currentMousePosSelect[currentMousePosSelect.length-2]][currentMousePosSelect[currentMousePosSelect.length-1]].isHoverd=true;
        
        grid[currentMousePosSelect[1]][currentMousePosSelect[0]].isHoverd=false;
        grid[currentMousePosSelect[3]][currentMousePosSelect[2]].isHoverd=true;
        //    grid[currentMousePosSelect[currentMousePosSelect.length-2]][currentMousePosSelect[currentMousePosSelect.length-1]].isHoverd=true;
      

    
        redrawFirst();
        
      }
   }

  
    
}
// function mouseOver(){
//   console.log("AAA");
// }

function mouseClicked(){
  let x_mouse=floor(mouseY/cellDimentions);
  let y_mouse=floor(mouseX/cellDimentions);
  if(selectStartPoint==true && x_mouse<rows && y_mouse<cols && x_mouse>=0 && y_mouse>=0){
    selectStartPoint=false;
    console.log(start);
    openSet.pop();

    start=grid[x_mouse][y_mouse];

    start.wall=false;
    start.isHoverd=false;
    openSet.push(start);
    console.log(start);
    redrawFirst();
  }
  if(selectEndPoint==true && x_mouse<rows && y_mouse<cols && x_mouse>=0 && y_mouse>=0){
    selectEndPoint=false;
    console.log(end);


    end=grid[x_mouse][y_mouse];

    end.wall=false;
    end.isHoverd=false;

    console.log(end);
    redrawFirst();
  }
}

function moveEndPoint(){
  selectEndPoint=true;
  selectStartPoint=false;

console.log("Aa");
  let x_mouse=floor(mouseY/cellDimentions);
  let y_mouse=floor(mouseX/cellDimentions);


   currentMousePosSelect.push(y_mouse,x_mouse);
    if(currentMousePosSelect.length>=6){
      currentMousePosSelect.splice(0,2);
    }

  if(x_mouse<rows && y_mouse<cols && x_mouse>=0 && y_mouse>=0)    {
    
  

    if(currentMousePosSelect[0]>=0  && currentMousePosSelect[0]<cols && currentMousePosSelect[1]>=0 && currentMousePosSelect[1]<rows  && currentMousePosSelect[1]<cols)
      {//  if(x_mouse!=currentMousePosSelect[currentMousePosSelect.length-4] || y_mouse!= currentMousePosSelect[currentMousePosSelect.length-3])
      //    grid[x_mouse][y_mouse].isHoverd=true;

      // grid[currentMousePosSelect[currentMousePosSelect.length-4]][currentMousePosSelect[currentMousePosSelect.length-3]].isHoverd=false;
      //    grid[currentMousePosSelect[currentMousePosSelect.length-2]][currentMousePosSelect[currentMousePosSelect.length-1]].isHoverd=true;
      
      grid[currentMousePosSelect[1]][currentMousePosSelect[0]].isHoverd=false;
      grid[currentMousePosSelect[3]][currentMousePosSelect[2]].isHoverd=true;
      //    grid[currentMousePosSelect[currentMousePosSelect.length-2]][currentMousePosSelect[currentMousePosSelect.length-1]].isHoverd=true;
    

  
      redrawFirst();
      
    }
 }

}


let nr_rows=document.getElementById("nr_of_rows").addEventListener("keyup", (e)=>{  
  if(e.key==='Enter'){
    rows=parseInt(e.target.value);
      h=rows*cellDimentions;
      grid=new Array(rows);
      begin=false;
      openSet= [];
      closedSet = [];
      path=[];

 setup();
    

   
  }

});


let nr_cols=document.getElementById("nr_of_cols").addEventListener("keyup", (e)=>{  
  if(e.key==='Enter'){
    cols=parseInt(e.target.value);
      w=cols*cellDimentions;

      begin=false;
      openSet= [];
      closedSet = [];
      path=[];

 setup();

   
  }

});

let cell_size=document.getElementById("cell_size").addEventListener("keyup", (e)=>{  
  if(e.key==='Enter'){
  
    cellDimentions=parseInt(e.target.value);
    w=cols*cellDimentions, h=rows*cellDimentions;

      begin=false;
      openSet= [];
      closedSet = [];
      path=[];

 setup();


   
  }

});


let rand_wall_procentage=document.getElementById("procentage_random_walls").addEventListener("keyup", (e)=>{  
  if(e.key==='Enter'){
  
    procet=parseInt(e.target.value);
    

      begin=false;
      openSet= [];
      closedSet = [];
      path=[];
 setup();
  }
});

let checkBoxRamdomWalls=document.getElementById("_checkbox").addEventListener("change",(e)=>{

allowRandomWalls=!allowRandomWalls;

 console.log(allowRandomWalls);
  begin=false;
  openSet= [];
  closedSet = [];
  path=[];
  setup();
   
  })