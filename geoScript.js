/*******************************************************/
// P5.play: A simple game
// 
// This game can be used as an extra game for the 12COMP
// and 13COMP Databases assessments
//
// Written by Mr Britton
/*******************************************************/
const SCREEN_WIDTH = 400;
const SCREEN_HEIGHT = 200;
const PLAYER_HEIGHT = 25;
const PLAYER_WIDTH = 25;


const OBSTACLE_HEIGHT = PLAYER_HEIGHT;
const OBSTACLE_WIDTH = PLAYER_WIDTH;

var spawnDist = 0;
var nextSpawn = 0;
var score = 0;
var player;
  
var screenSelector = "start";  
let currentUserID = null;
let highScoreSubmitted = false; 
var obstacles;
console.log("Running the game");

firebase.auth().onAuthStateChanged(authStateChanged);

function authStateChanged(user) {
  if (user == null) {
    currentUserID = null;
    console.log("No user logged in. Scores will not be saved.");
  } else {
    currentUserID = user.uid;
    console.log("Logged in user ID: " + currentUserID);
  }
}
function saveHighScore() {
if (currentUserID == null) {
    console.log("No user is logged in, Score NOT saved")
}

// create a variable for user's best score
  let scoreRef = firebase.database().ref("userInfo/" + currentUserID + "/bestScore2");

  // grabs the current best score by taking a snapshot and assigning it to current best
  scoreRef.once("value", function(snapshot) {
    let currentBest = snapshot.val();

    if (currentBest == null) {
  currentBest = 0;
} // Defaults to 0 if they don't have a score yet

    // if new score is better than old score change it
  if (score > currentBest) {
      scoreRef.set(score, function(error) {
        if (error) {
          console.log("Error saving high score: " + error);
        } else {
          console.log("New high score saved: " + score);
        }
      });
    } else {
      console.log("Game over, but you didn't beat your high score of " + currentBest);
    }
  })};

// End game code
function endGame(_player, _obstacle){
    console.log("Game ended, you got "+score+" points.")

    saveHighScore();
    screenSelector = "end";
    player.remove();
    obstacles.removeAll();
    
      return;
}
    // Put your database writes here:
      
            
        
       

    
    



































/*******************************************************/
// setup()
/*******************************************************/
function setup() {
    cnv= new Canvas(SCREEN_WIDTH, SCREEN_HEIGHT);
    
    obstacles = new Group();

    floor =  new Sprite(SCREEN_WIDTH/2,  SCREEN_HEIGHT, SCREEN_WIDTH, 4, 's');
    floor.color = color("black");
    world.gravity.y = 80;
    
    document.addEventListener("keydown", 
        function(event) {
            if(screenSelector == "start"||screenSelector == "end"){
                screenSelector = "game"
                resetGame();
            }else{
                if(player.y > 184 ){// 184 - found from testing - floor level
                    player.vel.y = -20;
                }
            }
    });

}

/*******************************************************/
// draw()
/*******************************************************/
function draw() {
    if(screenSelector=="game"){
        gameScreen();
    }else if(screenSelector=="end"){
        endScreen();
    }else if(screenSelector=="start"){
        startScreen();
    }else{
        text("wrong screen - you shouldnt get here", 50, 50);
        console.log("wrong screen - you shouldnt get here")
    }
}

function newObstacle(){
    obstacle = new Sprite((SCREEN_WIDTH + 50),  SCREEN_HEIGHT - OBSTACLE_HEIGHT/2, OBSTACLE_WIDTH, OBSTACLE_HEIGHT, 'k');
    obstacle.color = color("yellow");
    obstacle.vel.x = -10;
    
    obstacles.add(obstacle);
}

// Main screen functions

function startScreen(){
    background("white");

    allSprites.visible = false;
    textSize(32);
    fill(255);
    stroke(0);
    strokeWeight(4);
    text("Welcome to the game", 50, 50);
    textSize(24);
    text("Press any key to start", 50, 110);    textSize(24);
    text("Press space to jump", 50, 150);
}

function gameScreen(){
    background("#C39BD3");
    allSprites.visible = true;
    score++;
    if(frameCount> nextSpawn){
        newObstacle();
        nextSpawn = frameCount + random(10,100);
    }
    textSize(32);
    fill(255);
    stroke(0);
    strokeWeight(4);
    text(score, 50, 50);
}

function endScreen(){
    background("white");

    allSprites.visible = false;
    textSize(32);
    fill(255);
    stroke(0);
    strokeWeight(4);
    text("You died! Too bad :-(", 50, 50);
    textSize(24);
    text("your score was: "+score, 50, 110);
    textSize(14);
    text("press any key to restart", 50, 150);
}

function resetGame(){
    player = new Sprite(PLAYER_WIDTH*1.2,  SCREEN_HEIGHT/2, PLAYER_WIDTH, PLAYER_HEIGHT, 'd');
    player.color = color("purple");
    player.collides(obstacles, endGame);
    score = 0;
}

/*******************************************************/
//  END OF APP
/*******************************************************/