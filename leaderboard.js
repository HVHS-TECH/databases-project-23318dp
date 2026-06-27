function loadGame2Leaderboard() {    //create function for leaderboard
    
    let leaderboard = document.getElementById("leaderboard");  //stores div in leaderboard
    
    firebase.database().ref("userInfo").once("value", function(snapshot) {   //take snapshot of useInfo section
       leaderboard.innerHTML = "";     //clear leaderboad before adding score
       snapshot.forEach(function(childSnapshot) {  //loop through each user in userinfo
        let userData = childSnapshot.val();

        if (userData.bestScore2 != null) {  //check wether the user has a score and add it to leaderborard 
        leaderboard.innerHTML +=
          "<p>" + userData.gameName + ": " + userData.bestScore2 + "</p>";
   }
    });
  });
}