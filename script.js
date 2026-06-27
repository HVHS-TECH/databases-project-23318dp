let curretUser = null;

firebase.auth().onAuthStateChanged(function(user){
  if (user) {
    currentUser = user;
    console.log("Logged in");

    let pfp = document.getElementById("userPfp");
    if (pfp && user.photoURL) {
        pfp.src = user.photoURL;
      }
  }
} else {
  currentUser = null;
  console.log("Not logged in")
}















function fb_popupLogin() {

  firebase.auth().onAuthStateChanged((user) => {

    if (user) {

      console.log("Logged in");

      const pfp = document.getElementById("userPfp");

      if (pfp && user.photoURL) {
        pfp.src = user.photoURL;
      }

      let userID = user.uid;
      let userImage = user.photoURL;
      let userEmail = user.email;
      let userDisplayName = user.displayName;
      const gameName = document.getElementById("gameName").value; //defining name
      const age = document.getElementById("age").value;           //defining age
      firebase.database().ref("userInfo/" + userID).update({
        gameName: gameName,
        age: age,
        email: userEmail,
        profilePicture: userImage,
        displayName: userDisplayName
      });

    } else {

      console.log("Not logged in");

      const provider = new firebase.auth.GoogleAuthProvider();

      provider.addScope("profile");
      provider.addScope("email");

      firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {

          const user = result.user;

          console.log(user);

          const pfp = document.getElementById("userPfp");

          if (pfp && user.photoURL) {
            pfp.src = user.photoURL;
          }

        })
        .catch((error) => {
          console.log(error);
        });
    }
  });
}
function submitInfo() {

  const gameName =
    document.getElementById("gameName").value;

  const age =
    document.getElementById("age").value;

  // Get logged-in user
  let user = firebase.auth().currentUser;

  // Make sure user is logged in
  if (!user) {

    alert("Please log in first.");
    return;

  }

  if (!gameName || !age) {

    alert("Please fill all the boxes.");
    return;

  }

  let userID = user.uid;
  let userImage = user.photoURL;
  let userEmail = user.email;
  let userDisplayName = user.displayName;


  firebase.database().ref("userInfo/" + userID).set({

    gameName: gameName,
    age: age,
    email: userEmail,
    profilePicture: userImage,
    displayName: userDisplayName


  });

  console.log("Data sent!");

  document.getElementById("statusMessage").innerHTML =
    "Form submitted!";
}