function helloWorld(){
  console.log("Kia ora te ao()")
  firebase.database().ref('users/Ben').set(
    {
      
      age: 22,
      
      Been_to_epsteins_island: true,


    }
  )
}