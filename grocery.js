let categories = document.getElementById("categories")
let submitBtn = document.getElementById("submitBtn")
let groceryLists = document.getElementById("groceryLists")
let database= firebase.database()
let categoriesRef = database.ref("Categories")
let viewAllCatsBtn = document.getElementById("viewAllCatsBtn")
let deleteSelectionBtn = document.getElementById("deleteSelectionBtn")
let addGroceryItemBtn = document.getElementById("addGroceryItemBtn")
let groceryItem = document.getElementById("groceryItem")

let stores= []
let groceryItems = []

//add check to see if text box is empty
submitBtn.addEventListener("click", function(){ 
    let store = categories.value
    categoriesRef.push({
        store: store
    })
    //try to get it back to placeholder 
    categories.value = ""
})

viewAllCatsBtn.addEventListener('click',function(){
    stores = []
    groceryItems=[]
    database.ref("Categories")
    .on("child_added" , function(snapshot){
        stores.push({key: snapshot.key ,value: snapshot.val(),store: snapshot.val().store})
        groceryItems.push({items : snapshot.val()})
       // console.log(stores)
       //console.log(stores.store)
       //console.log(stores.key)

       displayAllStores()
       displayGrocerItems()
        
    })

})
function displayAllStores() {
    
    let storeLitems = stores.map((store) => {
        
      return `<li>
          ${store.store} ${store.value}
          
      </li>
      <button onclick="deleteStore('${store.key}')">Delete</button>
      <button onclick="addIndividualGroceryItemBtn('${store.key}')">Add Item</button>`

     
    })
    groceryLists.innerHTML = storeLitems.join('')}


function deleteStore(key){
    database.ref("Categories").child(key).remove()
}

database.ref("Categories")
.on("child_removed",function(snapshot){

    stores = stores.filter((store) => {
      return store.key != snapshot.key
    })

    displayAllStores()
})

function addIndividualGroceryItemBtn(key){
    groceryItems=[]
    database.ref("Categories")
    // dont need this just too confusing .on("child_added" , function(snapshot){
       // stores.push({key: snapshot.key ,value: snapshot.val(),store: snapshot.val().store})
        
       // groceryItems.push({items : snapshot.val()})

   let grocerItem = groceryItem.value
   
    let storesRef = database.ref("Categories")
   storesRef.child(key).push({
       item : grocerItem
   
})
}

function displayGrocerItems(){

    for (item in groceryItems){
        let items = groceryItems[item]
        console.log(items)
        for (abc in items){
            let a= items[abc]
            console.log(a)
            console.log(a.store)
            for (bc in a){
                let b = a[bc]

                console.log(b)
                let c= `<li>${b.item}</li>`

                groceryLists.insertAdjacentHTML('beforeend',c)
            
           


            }

        }
    }
    
    
}