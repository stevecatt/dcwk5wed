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
//let ShoppinItems = document.getElementById("ShoppinItems")

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
    stores.push({key: snapshot.key ,value: snapshot.val(),store: snapshot.val().store,uid:snapshot.val().user})
   // console.log(stores) 
   displayAllStores(snapshot.val().user)
   storesInput.value =""
  
})

function displayAllStores(uid) {
    //uses the uid to check to see if the stpre belongs to user
       //console.log(store.value.user)

    let storeLitems = stores.filter(store=>store.value.user == uid).map(store => {
         console.log(store.value.user)
        //console.log(store.store)
        
      return `<li>
      ${store.store} 
        

      </li>
      <button onclick="addItem('${store.value.user}','${store.store}')">add grocery item</button>
    `
    })

    groceryLists.innerHTML = storeLitems.join('')
}

//commented out 'cos users is defined by registratiion
database.ref("Users")
.on("child_added", function (snapshot){
 users.push({key: snapshot.key ,value: snapshot.val(),user: snapshot.val().user})
    
   displayUsers(snapshot.val().user)
    
})//this is a way to get the user id back

function displayUsers(uid){
    let userLitems = users.filter(user => user.value.user ==uid).map(user =>{
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
    groceryItems.push({key: snapshot.key ,value: snapshot.val(),item: snapshot.val().item, uid:snapshot.val().userid})
    console.log(groceryItems) 
   displayGroceries(snapshot.val().userid)
   groceryItemInput.value=""

})
// add uid to display the grocery items with that user in them 
function displayGroceries(uid){
    let groceryLiItems  = groceryItems.filter(groc=>groc.value.userid== uid).map((groc) => {
       
        return `<li>
            ${groc.value.item} 
            ${groc.value.storename}
            
            
        </li>
        `
        
       
      })
      ShoppinItems.innerHTML = groceryLiItems.join('')
    }