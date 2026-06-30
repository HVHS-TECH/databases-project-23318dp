

//GAME 1

function loadGame1Leaderboard() {    //create function for leaderboard
    
    let leaderboard = document.getElementById("leaderboard");  //stores div in leaderboard
    let score = []; //empty array
    firebase.database().ref("userInfo").once("value", function(snapshot) {   //take snapshot of useInfo section
       leaderboard.innerHTML = "";     //clear leaderboad before adding score
       snapshot.forEach(function(childSnapshot) {  //loop through each user in userinfo
       let userData = childSnapshot.val();
        if (userData.bestScore1== null){}
        
        if (userData.bestScore1 != null) {  //check wether the user has a score and add it to leaderborard 
        score.push({
          name: userData.gameName,
          score: Number(userData.bestScore1)
        })
        
         
          
        }

    });
    //sort scores from highest to lowest
    score.sort(function(a,b){
      return b.score - a.score;
    })
    //display scores
    for (let i= 0; i <score.length; i++) {
      leaderboard.innerHTML +=
      "<p>" + (i + 1) + "." + score[i].name + ":" + score[i].score + "</p>";
    } 
  });
}

//GAME 2


function loadGame2Leaderboard() {    //create function for leaderboard
    
    let leaderboard = document.getElementById("leaderboard");  //stores div in leaderboard
    let score = []; //empty array
    firebase.database().ref("userInfo").once("value", function(snapshot) {   //take snapshot of useInfo section
       leaderboard.innerHTML = "";     //clear leaderboad before adding score
       snapshot.forEach(function(childSnapshot) {  //loop through each user in userinfo
       let userData = childSnapshot.val();
        if (userData.bestScore2== null){}
        
        if (userData.bestScore2 != null) {  //check wether the user has a score and add it to leaderborard 
        score.push({
          name: userData.gameName,
          score: Number(userData.bestScore2)
        })
        
         
          
        }

    });
    //sort scores from highest to lowest
    score.sort(function(a,b){
      return b.score - a.score;
    })
    //display scores
    for (let i= 0; i <score.length; i++) {
      leaderboard.innerHTML +=
      "<p>" + (i + 1) + "." + score[i].name + ":" + score[i].score + "</p>";
    } 
  });
}
