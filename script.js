let currentUser = null;

firebase.auth().onAuthStateChanged(function(user){
  if (user) {
    currentUser = user;
    console.log("Logged in");

       if (pfp && user.photoURL) {
      pfp.src = user.photoURL;
    }

  } else {
    currentUser = null;
    console.log("Not logged in");
  }

});

function fb_popupLogin() {
  let provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope("profile");
  provider.addScope("email");

  firebase.auth().signInWithPopup(provider)
  .then(function(result) {
    currentUser = result.user;
    console.log(currentUser);

    let pfp = document.getElementById("userPfp");
    if (pfp && currentUser.photoURL) {
      pfp.src = currentUser.photoURL;
    }
  })

.catch(function(error) {
      console.log("Login error: " + error);
    });

}
function submitInfo(){
  let gameName = document.getElementById("gameName").value;
  let age = document.getElementById("age").value;
  if (currentUser == null) {
    alert("Please log in first");
    return;
  }
if (gameName == "" || age == "") {
  alert("Please fill all the boxes");
  return;
}
let userID = currentUser.uid;
let userImage = currentUser.photoURL;
let userEmail = currentUser.email;
let userDisplayName = currentUser.displayName;
firebase.database().ref("userInfo/" + userID).update({
  gameName: gameName,
  age: age,
  email: userEmail,
  profilePicture: userImage,
  displayName: userDisplayName
});
console.log("data recived")
document.getElementById("statusMessage").innerHTML = "form submitted";
}















