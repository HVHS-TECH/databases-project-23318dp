/**************************************************************/
// fb_initialise()
// Initialize firebase, connect to the Firebase project.
// 
// Find the config data in the Firebase console. Cog wheel > Project Settings > General > Your Apps > SDK setup and configuration > Config
//
// Input:  n/a
// Return: n/a
/**************************************************************/
  const firebaseConfig = {
    apiKey: "AIzaSyDbGY9zzewo6dUZL94n_s-CmAqezLvljCU",
    authDomain: "comp-daniel.firebaseapp.com",
    databaseURL: "https://comp-daniel-default-rtdb.firebaseio.com",
    projectId: "comp-daniel",
    storageBucket: "comp-daniel.firebasestorage.app",
    messagingSenderId: "374735681822",
    appId: "1:374735681822:web:897998b09892f3be55710f",
    measurementId: "G-NL11TMTH06"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // This log prints the firebase object to the console to show that it is working.
  // As soon as you have the script working, delete this log.
  console.log("Firebase initialize finished:");
  console.log(firebase);
