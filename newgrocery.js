let storesInput = document.getElementById("categories")
let submitBtn = document.getElementById("submitBtn")
let groceryLists = document.getElementById("groceryLists")
let database= firebase.database()
let storesRef = database.ref("Store")
let usersRef = database.ref("Users")
let groceryItemsRef = database.ref("groceryItems")
let viewAllCatsBtn = document.getElementById("viewAllCatsBtn")
let deleteSelectionBtn = document.getElementById("deleteSelectionBtn")
let addGroceryItemBtn = document.getElementById("addGroceryItemBtn")
let groceryItemInput = document.getElementById("groceryItemInput")

let kittyLitter = document.getElementById("kittyLitter")
let ShoppinItems = document.getElementById("ShoppinItems")
//let addUserShopplistBtn = document.getElementById("addUserShopplistBtn")



let stores= []
//console.log(stores)
let groceryItems = []
let users = []

//submitBtn.addEventListener("click", function(){ 
    
   // storesRef.push({
      //  store: storesInput.value
        
   // })
    //try to get it back to placeholder 
    //stores.value = ""
//})

 function addUser(){ 
    
    usersRef.push({
        users: uid
    })
    //try to get it back to placeholder 
    users.value = ""
}

storesRef 
.on("child_added" , function(snapshot){
    stores.push({key: snapshot.key ,value: snapshot.val(),store: snapshot.val().store})
   // console.log(stores) 
   displayAllStores()
   storesInput.value =""
  
})

function displayAllStores() {
    
    let storeLitems = stores.map((store) => {
       // console.log(store.value.user)
        //console.log(store.store)
        
      return `<li>
          ${store.store} 
          
          
      </li>
      <button onclick="addItem('${store.value.user}','${store.store}')">add grocery item</button>
      `
     
    })
    groceryLists.innerHTML = storeLitems.join('')}

//commented out 'cos users is defined by registratiion
//database.ref("Users")
//.on("child_added", function (snapshot){
  //  users.push({key: snapshot.key ,value: snapshot.val(),user: snapshot.val().user})
    
  //  displayUsers()
    
//})//this is a way to get the user id back

function displayUsers(){
    let userLitems = users.map((user) => {
        //console.log(user.key)
        //console.log(user.user)
        //console.log(user.value.name)
        //console.log(groceryItemInput.value)
        return `<li>
            ${user.value.name} 
            
            
        </li>
        <button onclick="addItem('${user.value.name}')">add grocery item</button>
        
        <button onclick="adShopplistBtn('${user.user}')">Create Grocery List</button>`
        
       
      })
      kittyLitter.innerHTML = userLitems.join('')
    }


function adShopplistBtn(cat){
    storesRef.push({
        store: storesInput.value ,
        user: cat
         
    
    })
}
function addItem(dog,mouse){
    groceryItemsRef.push({
        
        item: groceryItemInput.value,
        userid: dog,
        storename: mouse
         
    
    })
}

groceryItemsRef
.on("child_added" , function(snapshot){
    groceryItems.push({key: snapshot.key ,value: snapshot.val(),item: snapshot.val().item})
    console.log(groceryItems) 
   displayGroceries()
   groceryItemInput.value=""

})

function displayGroceries(){
    let groceryLiItems  = groceryItems.map((groc) => {
       
        return `<li>
            ${groc.value.item} 
            ${groc.value.storename}
            
            
        </li>
        `
        
       
      })
      kittyLitter.innerHTML = groceryLiItems.join('')
    }