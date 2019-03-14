let categories = document.getElementById("categories")
let submitBtn = document.getElementById("submitBtn")
let groceryLists = document.getElementById("groceryLists")
let database= firebase.database()
let categoriesRef = database.ref("Categories")
let viewAllCatsBtn = document.getElementById("viewAllCatsBtn")
let deleteSelectionBtn = document.getElementById("deleteSelectionBtn")
let addGroceryItemBtn = document.getElementById("addGroceryItemBtn")
let groceryItem = document.getElementById("groceryItem")
let kittyLitter = document.getElementById("kittyLitter")

let stores= []
let groceryItems = []
let users = []

//add check to see if text box is empty
submitBtn.addEventListener("click", function(){ 
    
    categoriesRef.push({
        store: categories.value
    })
    //try to get it back to placeholder 
    categories.value = ""
})

/*viewAllCatsBtn.addEventListener('click',function(){
    stores = []
    groceryItems=[]
    database.ref("Categories")
    .once("child_added" , function(snapshot){
        stores.push({key: snapshot.key ,value: snapshot.val(),store: snapshot.val().store})
        
        groceryItems.push({items : snapshot.val()})
       // console.log(stores)
       //console.log(stores.store)
       //console.log(stores.key)

       displayAllStores()
      displayGrocerItems()
        
    })

})
*/





function displayAllStores() {
    
    let storeLitems = stores.map((store) => {
        
      return `<li>
          ${store.store} 
          
          
      </li>
      <button onclick="deleteStore('${store.key}')">Delete</button>
      <button onclick="addIndividualGroceryItemBtn('${store.key}')">Add Item</button>`
     
    })
    groceryLists.innerHTML = storeLitems.join('')}
   // groceryLists.insertAdjacentHTML('beforeend',storeLitems)}


function deleteStore(key){
    database.ref("Categories").child(key).remove()
}

database.ref("Categories")
.on("child_removed",function(snapshot){

    stores = stores.filter((store) => {
        console.log(snapshot.key)
        console.log("this is store key")
        console.log(store.key)
      return store.key != snapshot.key
    })

    displayAllStores()
})

function addIndividualGroceryItemBtn(key){
   
    database.ref("Categories")
    
        let storesRef = database.ref("Categories")
        storesRef.child(key).push({
        item : groceryItem.value
    
   
        })
        groceryItem.value = ""
        displayGrocerItems()
    }

 function displayGrocerItems(){
     


    for (item in groceryItems){
        let items = groceryItems[item]
        //console.log(items)
        
        for (abc in items){
            let a= items[abc]
            //console.log(a)
            //console.log(a.store)
            for (bc in a){
                let b = a[bc]
                
                console.log ("this is last iteration")
                console.log(b.item)
                if (b.item != null){
                //let c = `<li></li>`}
                //else{
                let c= 
                   `<li>Items in ${a.store} list :  ${b.item}</li>`
                
                

                kittyLitter.insertAdjacentHTML('beforeend', c)
                //kittyLitter.innerHTML = `${a.store} ${c}`
                console.log("this is output ")
                console.log(c)}
                
            
           


            }

            
         //console.log("hopefully ")   
        }
    }//console.log(c)
    
    
}




database.ref("Categories")
.on("child_added" , function(snapshot){
    stores = stores.filter((store) => {
        console.log(snapshot.key)
        console.log("this is store key")
        console.log(store.key)
      return store.key != snapshot.key
    })
    
    stores.push({key: snapshot.key ,value: snapshot.val(),store: snapshot.val().store})
    //if (snapshot.val() !=" "){
    groceryItems.push({items : snapshot.val()})//}
   // console.log(stores)
   //console.log(stores.store)
   //console.log(stores.key)

   displayAllStores()
  //displayGrocerItems()
  
})

database.ref("Categories")
.on("child_changed" , function(snapshot){
    //stores.push({key: snapshot.key ,value: snapshot.val(),store: snapshot.val().store})
    //if (snapshot.val() !=" "){
    groceryItems.push({items : snapshot.val()})//}
   // console.log(stores)
   //console.log(stores.store)
   //console.log(stores.key)

   displayAllStores()
  displayGrocerItems()
  
})
/*let storesRef = database.ref("Categories")
storesRef.on('child_added',function(snapshot){
    console.log(snapshot.val())
    groceryItems.push({items : snapshot.val()})
    displayGrocerItems()
})
*/

console.log(stores)
console.log("this is grocery items ")
console.log(groceryItems)
console.log("test the object thing")
console.log(Object.keys(groceryItems))