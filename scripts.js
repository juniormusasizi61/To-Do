const todoValue = document.getElementById('todoText');
const todoAlert  = document.getElementById('Alert');
const listitem  = document.getElementById('list-items');
const addUpdate = document.getElementById('AddUpdateClick');


//declare local storage object
let todo = JSON.parse(localStorage.getItem("todo-list"));
if (!todo) {
  todo = [];
}


///CRUD funtions 
function CreateToDoItems(){
    if(todoValue.value ===""){
        todoAlert.innerText = "please enter your task!...";
        todoValue.focus();
    }else{
        let IsPresent = false;
        todo.forEach((element) => {
            if(element.item == todoValue.value){
                IsPresent = true;
            }
        });
    if(IsPresent){
        setAlertMessage('This item already exists on the list!');
        return;
    }
    let li = document.createElement('li');
    const todoItems = `<div title = "hit doudle click and complete" ondblclick = "CompletedToDoItems(this)">${todoValue.value}</div><div>
    <img class ="edit to-do controls" onclick="UpdateToDoItems(this)" src = "./img/pencil.png" />
    <img class = "delete todo-controls" onclick="DeleteToDoItems(this)" src = "./img/delete.png"/>
    </div>
    <div>`;

    li.innerHTML = todoItems;
    listItems.appendChild(li);

    if(!todo){
        todo = [];
    }
    let itemList = {item: todoValue.value, status: false};
    todo.push(itemList);
    setLocalStorage();
    }
todoValue.value= '';
setAlertMessage('Todo item Created Successfully!');
}


//READ data from local storage
function ReadToDoItems(){
    todo.forEach((element)=>{
    let li = document.createElement('li');
    let style = "";
    if (element.status){
        style = 'style="text-decoration: line-through"';
    }
    const todoItems = `<div ${style} title = "Hit Doudle Click and Complete" onclick = "completedToDoItems(this)">${element.item}
    ${
        style ===""
        ?""
        :'<img class="todo-controls" src= "./img/check-mark.png"/>'
    }</div>
    <div>
    ${
    style === ""
    ?'<img class="edit todo-controls" onclick = "UpdateToDoItems(this)" src="./img/pencil.png"/></div></div>'
    :""
    }
    <img class ="delete todo-controls" onclick="DeleteToDoItems(this)" src="./img/delete.png" /></div></div>`;
    li.innerHTML = todoItems;
    listItems.appendChild(li);
    });
}
ReadToDoItems();


//update todo items 
function UpdateToDoItems(e){
    if(
        e.parentElement.querySelector("div").style.textDecoration === ""){
            todoValue.value = e.parentElement.parentElement.querySelector("div").innerText;
            updateText = e.parentElement.parentElement.querySelector("div");
            addUpdate.setAttribute("onclick","UpdateOnSelectItems()");
            addUpdate.setAttribute("src", "./img/refresh.png");
            todoValue.focus();
        }
}


//update on selection 
function UpdateOnSelectItems(){
    let IsPresent = false;
    todo.forEach((element)=>{
        if(element.item == todoValue.value){
            IsPresent = true;
        }
    })

    if(IsPresent){
        setAlertMessage("This item already appears in the list ");
        return;
    }
    todo.forEach((element)=>{
        if(element.item == updateText.innerText.trim()){
            element.item = todoValue.value;
        }
    });
    setLocalStorage();

    updateText.innerText = todoValue.value;
    addUpdate.setAttribute("oonclick","CreateToDoItems()");
    addUpdate.setAttribute("src","./img/plus.png");
    todoValue.value = "";
    setAlertMessage("Todo item Updated Successfully!");
}


//Delete function 
function DeleteToDoItems(e){
    let deleteValue = e.parentElement.parentElement.querySelector("div").innerText;
    if(confirm(`Are you sure you want to delete this ${deleteValue}!`)){
        e.parentElement.parentElement.setAttribute("class","deleted-item");
        todoValue.focus();
        todo.forEach((element)=>{
            if(element.item == deleteValue.trim()){
                todo.splice(element, 1);
    
            }
        });

        setTimeout(()=>{
            e.parentElement.parentElement.remove();
        }, 1000);
        setLocalStorage();
    }
}


//completed todo items function
function CompletedToDoItems(e) {
    if (e.parentElement.querySelector("div").style.textDecoration === "") {
      const img = document.createElement("img");
      img.src = "/images/check-mark.png";
      img.className = "todo-controls";
      e.parentElement.querySelector("div").style.textDecoration = "line-through";
      e.parentElement.querySelector("div").appendChild(img);
      e.parentElement.querySelector("img.edit").remove();
  
      todo.forEach((element) => {
        if (
          e.parentElement.querySelector("div").innerText.trim() == element.item
        ) {
          element.status = true;
        }
      });
      setLocalStorage();
      setAlertMessage("Todo item Completed Successfully!");
    }
  }
  