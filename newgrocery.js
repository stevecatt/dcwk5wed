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
let groceryItem = document.getElementById("groceryItem")
let kittyLitter = document.getElementById("kittyLitter")
//let addUserShopplistBtn = document.getElementById("addUserShopplistBtn")



let stores= []
//console.log(stores)
let groceryItems = []
let users = []

submitBtn.addEventListener("click", function(){ 
    
    storesRef.push({
        store: storesInput.value
        
    })
    //try to get it back to placeholder 
    stores.value = ""
})

 function addUser(){ 
    
    usersRef.push({
        users: uid
    })
    //try to get it back to placeholder 
    users.value = ""
}

database.ref("Store")
.on("child_added" , function(snapshot){
    stores.push({key: snapshot.key ,value: snapshot.val(),store: snapshot.val().store})
   // console.log(stores) 
   displayAllStores()
  
})

function displayAllStores() {
    
    let storeLitems = stores.map((store) => {
        
      return `<li>
          ${store.store} 
          
          
      </li>
      <button onclick="addItem('${store.store}')">addItem</button>
      <button onclick="addIndividualGroceryItemBtn('${store.store}')">Add Item</button>`
     
    })
    groceryLists.innerHTML = storeLitems.join('')}


database.ref("Users")
.on("child_added", function (snapshot){
    users.push({key: snapshot.key ,value: snapshot.val(),user: snapshot.val().user})
    //console.log(users) 
    displayUsers()
    
})//this is a way to get the user id back

function displayUsers(){
    let userLitems = users.map((user) => {
        console.log(user.key)
        console.log(user.user)
        return `<li>
            ${user.user} 
            
            
        </li>
        <button onclick="addItem('${user.user}')">add grocery item</button>
        
        <button onclick="adShopplistBtn('${user.user}')">Create Grocery List</button>`
       
      })
      kittyLitter.innerHTML = userLitems.join('')
    }


function adShopplistBtn(key){
    storesRef.push({
        item: "food",
        user:key
         
    
    })
}
function addItem(key){
    groceryItemsRef.push({
        store: "wassss",
        storeid: key
         
    
    })
}