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
        todo.forEach(element => {
            if(element.item == todoValue.value){
                IsPresent = true;
            }
        });
    if(IsPresent){
        setAlertMessage('This item already exists on the list!');
        return;
    }
    let li = document.createElement('li');
    const todoItems = '<div title = "hit doudle click and complete' ondblclick = "CompletedToDoItems(this)">${todoValue.value}</div><div><img class ="edit to-do controls" onclick="UpdateToDoItems(this)" src = "./img/pencil.png" />
    <img class = "delete todo-controls" onclick="DeleteToDoItems(this)" src = "./img/delete.png"/>
    </div>

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