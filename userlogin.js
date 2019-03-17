//registration
let loginPanel = document.getElementById("loginPanel")
let emailInput = document.getElementById("emailInput")
let passwordInput = document.getElementById("passwordInput")
let loginBtn = document.getElementById("loginBtn")
let registerBtn = document.getElementById("registerBtn")
let logOutBtn = document.getElementById("logOutBtn")
let name = document.getElementById("name")
//let dogfood = document.getElementById("dogfood")
console.log (emailInput.value)




//registration and new user function
registerBtn.addEventListener('click',function(){

    let email = emailInput.value
    let password = passwordInput.value
  
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(response) {
      console.log(response)
       
        let uid =  response.user.uid
        usersRef.push({
        user: uid,
        name: name.value

        

      })
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage)
      // ...
      emailInput.value = ""
      passwordInput.value = ""
    })
  
  
  })
  //login section 
  loginBtn.addEventListener('click',function(){

    let email = emailInput.value
    let password = passwordInput.value
  
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(response){
      console.log(response.user.uid)
      
      alert("logged in")
      //added this to check log on 
      let uid = response.user.uid
      //feed the (uid) into the display stores so that the uid can move to the newgrocery js and filter out only the stores with uid
      
      displayAllStores(uid)
      displayGroceries(uid)
      displayUsers(uid)

      usersRef 
      . on("child_added", function (snapshot){
        users.push({key: snapshot.key ,value: snapshot.val(),user: snapshot.val().user})
        console.log(users)
        console.log(uid)
        let loggedOnUser = users.filter((user)=>{
          console.log(user.value.user)
          if (user.value.user == uid){
           console.log(user)
            kittyLitter.innerHTML= `<li>${user.value.name}</li>
            <button onclick="adShopplistBtn('${user.value.user}')">Create Grocery List</button>`
          
          console.log (user.value.name)

          }
          console.log(uid)
        //displayUsers(uid)
        })
      })
    

    
    
      
        
    
        
    
    })
    .catch(function(error) {
    // Handle Errors here.

    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage)
    alert("incorrect user name or password")
    // ...
    })
    
  })

  logOutBtn.addEventListener('click', function(){
    firebase.auth().signOut().then(function(){
        alert("signed out")
        console.log(firebase.auth().currentUser)
    }).catch(function(){
      
    })

  })