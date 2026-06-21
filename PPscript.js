let score = 5;
let balls;
let gameState = "start";
let ballsDropped = 0;
let highScoreSubmitted = false; //stops from spamming in CL
// 1. when the gme starts the variable is on Null
let currentUserID = null;

// 2. Track to see if user's UID is correct
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    currentUserID = user.uid;
    console.log("Game detected logged-in user:", currentUserID);
  } else {
    currentUserID = null;
    console.log("No user logged in. Scores will not be saved.");
  }
});

 function submitHighScore() {
  // If the user isn't logged in, don't try to save anything
  if (!currentUserID) {
    console.log("Score not saved: User is not logged in.");
    return;
  }

  // Path to this user's best score inside your userInfo node
  let scoreRef = firebase.database().ref("userInfo/" + currentUserID + "/bestScore");

  // grabs the current best score 
  scoreRef.once("value").then((snapshot) => {
    let currentBest = snapshot.val() || 0; // Defaults to 0 if they don't have a score yet

    // if new score is better than old score change it
    if (ballsDropped > currentBest) {
      scoreRef.set(ballsDropped)
        .then(() => {
          console.log("New high score of " + ballsDropped + " saved successfully!");
        })
        .catch((error) => {
          console.error("Error saving high score:", error);
        });
    } else {
      console.log("Game over, but you didn't beat your high score of " + currentBest);
    }
  });
}
    console.log("setup: ");
    function setup() {

    cnv = new Canvas(1920,940);

    world.gravity.y = 5;


    balls = new Group();
    balls.overlaps(balls);
    balls.diameter = 30;
    balls.color = color(255,0,0);


    //invisible walls (so ball cant escape)
  
    leftWall = new Sprite(710, 380, 10, 400 , 'k');
    leftWall.color = color(0,0,0,0);
    leftWall.stroke = '0';
    leftWall.rotation = 35
   leftWall.visible = false;
    rightWall = new Sprite(1125, 380, 10, 400 , 'k');
    rightWall.color = color(0,0,0,0);
    rightWall.stroke = '0';
    rightWall.rotation = 330
    rightWall.visible= false;
    //Multipliers
    pointFour = new Sprite(915, 590, 60, 30, 's');
    pointFour.color = color(255, 235,0);

    pointSevenL = new Sprite(850, 590, 60, 30, 's');
    pointSevenL.color = color(255, 165,0);

    pointSevenR= new Sprite(980, 590, 60, 30, 's');
    pointSevenR.color = color(255, 165,0);

    oneThreeL= new Sprite(785, 590, 60, 30, 's');
    oneThreeL.color = color(255, 110,0);

    oneThreeR= new Sprite(1046, 590, 60, 30, 's');
    oneThreeR.color = color(255, 110,0);

    threeL= new Sprite(720, 590, 60, 30, 's');
    threeL.color = color(255, 50,0);

    threeR= new Sprite(1113, 590, 60, 30, 's');
    threeR.color = color(255, 50,0);

    thirteenL= new Sprite(655, 590, 60, 30, 's');
    thirteenL.color = color(255, 0,0);

    thirteenR= new Sprite(1180, 590, 60, 30, 's');
    thirteenR.color = color(255, 0,0);


    //plinks
    for (var i = 0; i < 10; i++) {
        var block = new Sprite(i*66.67 + 620, 550, 10, 'k');
        block.color = color(255,255,255); 
    }

    for (var i = 0; i < 9; i++) {
        var block = new Sprite(i*66.67 + 653, 500, 10, 'k');
        block.color = color(255,255,255); 
    }

    for (var i = 0; i < 8; i++) {
        var block = new Sprite(i*66.67 + 685, 450, 10, 'k');
        block.color = color(255,255,255);
    }

    for (var i = 0; i < 7; i++) {
        var block = new Sprite(i*66.67 + 720, 400, 10, 'k');
        block.color = color(255,255,255); 
    }

    for (var i = 0; i < 6; i++) {
        var block = new Sprite(i*66.67 + 752, 350, 10, 'k');
        block.color = color(255,255,255);
    }

    for (var i = 0; i < 5; i++) {
        var block = new Sprite(i*66.67 + 785, 300, 10, 'k');
        block.color = color(255,255,255);
    }

    for (var i = 0; i < 4; i++) {
        var block = new Sprite(i*66.67 + 815, 250, 10, 'k');
        block.color = color(255,255,255); 
    }

    for (var i = 0; i < 3; i++) {
        var block = new Sprite(i*66.67 + 850, 200, 10, 'k');
        block.color = color(255,255,255); 
    }
}


/*******************************************************/
// draw()
/*******************************************************/
function draw() {
    
    background(30, 35, 50);
    if (gameState != "game") {
        allSprites.visible = false;
    } else {
        allSprites.visible = true;
    }
    // START SCREEN
    if (gameState == "start") {
       
        fill("white");
        textSize(60);
        textAlign(CENTER);
        text("PUSSUM PLINKO", width/2, 200);

        fill("green");
        rect(width/2 -100, 350, 200, 60);
        fill("white");
        textSize(30);
        text("START", width/2, 390);

        fill("blue");
        rect(width/2 -100, 450, 200, 60);
        fill("white");
        text("HOW TO PLAY", width/2, 490);

        return;
    }

    //how to play
    if (gameState == "how") {

        fill("white");
        textSize(40);
        textAlign(CENTER);

        text("HOW TO PLAY", width/2,200);
        textSize(25);
        text("Click to drop balls.", width/2,300);
        text("Every ball cost 30% of your score.", width/2,340);
        text("Landing slots multiply your score .", width/2,380);
        text("Game is inteded for 1920x1080p screen sizes.", width/2,420);
        fill("red");
        text("If score lowers past 1 you fail", width/2,460);
        fill("white");
        text("Click anywhere to go back", width/2,540);

        return;
    }


    


    if (gameState == "end") {
        
        fill("white");
        textSize(40);
        textAlign(CENTER);

        text("BUSTED", width/2,200);
        textSize(25);
        text("Balls Dropped = " + ballsDropped, width/2,700);
     
        text("Refresh To Retry", width/2,400);
      // Only submit the high score if we haven't already handled it for this round
        if (!highScoreSubmitted) {
            submitHighScore();
            highScoreSubmitted = true; //closes gate
            
            
        }
       
        return;
    }

    // GAME
    fill('red')
    text(score, 915, 800);
    fill("red");
        rect(width/4 -100, 350, 200, 60);
    fill("white");
        textSize(30);
        text("End Game", 480, 390);


    
    for (let b of balls) {

        if (b.overlaps(pointFour)) hitMultiplier(b, 0.4);
        if (b.overlaps(pointSevenL)) hitMultiplier(b, 1);
        if (b.overlaps(pointSevenR)) hitMultiplier(b, 1);

        if (b.overlaps(oneThreeL)) hitMultiplier(b, 1.2);
        if (b.overlaps(oneThreeR)) hitMultiplier(b, 1.2);

        if (b.overlaps(threeL)) hitMultiplier(b, 2);
        if (b.overlaps(threeR)) hitMultiplier(b, 2);

        if (b.overlaps(thirteenL)) hitMultiplier(b, 3);
        if (b.overlaps(thirteenR)) hitMultiplier(b, 3);
    }
    if (mouseY > 480 && mouseY <390 ) {
        gameState = "end";
    }

}


function hitMultiplier(ball, value) {

    if (gameState =="game" && score <1) {
        gameState = "end";
    }
    score *= value;
    score = Math.round(score); 
    ball.remove();
}
function spawnBall() {
    let b = new balls.Sprite(random(900,950), 100);
    ballsDropped += 1;
    
}
function mousePressed() {
    if (gameState == "start") {
        if (mouseY > 350 && mouseY < 410) {
            gameState = "game";
        }
        if (mouseY > 450 && mouseY < 510) {
            gameState = "how";
        }
    } 
    else if (gameState == "how") {
        gameState = "start";
    } 
    else if (gameState == "game") {
        // 1. Check if the "End Game" button was clicked
        
        if (mouseX > 380 && mouseX < 580 && mouseY > 350 && mouseY < 410) {
            gameState = "end";
            return; // Stops execution here so a ball doesn't spawn
        }

        // 2. Only allow dropping a ball if the score is 1 or more
        if (score >= 1) {
            spawnBall();
            score -= 1;
            score = Math.round(score); 
        }
    }
}

/*******************************************************/
//  END OF APP
/*******************************************************/
