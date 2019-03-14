//registration
let loginPanel = document.getElementById("loginPanel")
let emailInput = document.getElementById("emailInput")
let passwordInput = document.getElementById("passwordInput")
let loginBtn = document.getElementById("loginBtn")
let registerBtn = document.getElementById("registerBtn")
let logOutBtn = document.getElementById("logOutBtn")
console.log (emailInput.value)

registerBtn.addEventListener('click',function(){

    let email = emailInput.value
    let password = passwordInput.value
  
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(user) {
      console.log(user)
        emailInput.value = ""
        passwordInput.value = ""
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
  
  loginBtn.addEventListener('click',function(){

    let email = emailInput.value
    let password = passwordInput.value
  
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(response){
      console.log(response.user.uid)
      
      alert("logged in")
      
    
    
      let uid =  response.user.uid
      usersRef.push({
        user: uid
        

        

      })
        
    
        
    
    })
    .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
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