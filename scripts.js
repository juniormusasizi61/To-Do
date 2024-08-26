const todoValue = document.getElementById("todoText");
const todoAlert = document.getElementById("Alert");
const listItems = document.getElementById("list-items");
const addUpdate = document.getElementById("AddUpdateClick");

//declare local storage object
let todo = JSON.parse(localStorage.getItem("todo-list")) || [];



///CRUD funtions
function CreateToDoItems() {
  //alert if input is empty
  
  if (todoValue.value.trim() === "") {
    //todoAlert.innerText = "Please enter your todo text!";
    setAlertMessage("please enter your todo text!");
    todoValue.focus();
    return;
  }
  const IsPresent = todo.some(item=>item.item === todoValue.value.trim());
  //  else {
  //   let IsPresent = false;
  //   todo.forEach((element) => {
  //     if (element.item == todoValue.value) {
  //       IsPresent = true;
  //     }
    // });

    if (IsPresent) {
      setAlertMessage("This item already present in the list!");
      return;
    }
//create a new list item 
    let li = document.createElement("li");
    const todoItems = `<div title="Hit Double Click and Complete" ondblclick="CompletedToDoItems(this)">${todoValue.value}</div><div>
                    <img class="edit todo-controls" onclick="UpdateToDoItems(this)" src="./img/pencil.png" />
                    <img class="delete todo-controls" onclick="DeleteToDoItems(this)" src="./img/delete.png" /></div>`;
    li.innerHTML = todoItems;
    listItems.appendChild(li);
//add new to do item to the array 
    let itemList = { item: todoValue.value.trim(), status: false };
    todo.push(itemList);
    setLocalStorage();
//
  todoValue.value = "";
  setAlertMessage("Todo item Created Successfully!");
}

//READ data from local storage
function ReadToDoItems() {
  todo.forEach(item => {
    const li = document.createElement("li");
    const style = item.status ? 'style="text-decoration: line-through"' : '';
    const checkMark = item.status ? '<img class="todo-controls" src="./img/checkmark.png"/>' : '';
    const editIcon = !item.status ? '<img class="edit todo-controls" onclick="UpdateToDoItems(this)" src="./img/pencil.png"/>' : '';
    
    li.innerHTML = `
      <div ${style} title="Double-click to complete" onclick="CompletedToDoItems(this)">
        ${item.item} ${checkMark}
      </div>
      <div>
        ${editIcon}
        <img class="delete todo-controls" onclick="DeleteToDoItems(this)" src="./img/delete.png" />
      </div>`;
    listItems.appendChild(li);
  });
}
//call the function
ReadToDoItems();

//update todo items
function UpdateToDoItems(element) {
  if (element.parentElement.parentElement.querySelector("div").style.textDecoration === "") {
    todoValue.value = element.parentElement.parentElement.querySelector("div").innerText;
    updateText = element.parentElement.parentElement.querySelector("div");
    addUpdate.setAttribute("onclick", "UpdateOnSelectItems()");
    addUpdate.setAttribute("src", "./img/refresh.jpeg");
    todoValue.focus();
  }
}

//update the selected to do items 
function UpdateOnSelectItems() {
  let IsPresent = false;
  todo.forEach((element) => {
    if (element.item == todoValue.value.trim()) {
      IsPresent = true;
    }
  });

  if (IsPresent) {
    setAlertMessage("This item already appears in the list ");
    return;
  }
  todo.forEach((element) => {
    if (element.item == updateText.innerText.trim()) {
      element.item = todoValue.value;
    }
  });
  setLocalStorage();

  updateText.innerText = todoValue.value.trim();
  addUpdate.setAttribute("onclick", "CreateToDoItems()");
  addUpdate.setAttribute("src", "./img/plus.png");
  todoValue.value = "";
  setAlertMessage("Todo item Updated Successfully!");
}

//delete a to do item 
function DeleteToDoItems(element) {
  let deleteValue = element.parentElement.parentElement.querySelector("div").innerText.trim();
  if (confirm(`Are you sure you want to delete this ${deleteValue}!`)) {
    element.parentElement.parentElement.setAttribute("class", "deleted-item");
    todoValue.focus();
    todo.forEach((element) => {
      if (element.item == deleteValue.trim()) {
        todo.splice(element, 1);
      }
    });

    setTimeout(() => {
      element.parentElement.parentElement.remove();
    }, 1000);
    setLocalStorage();
  }
}

//completed todo items function
function CompletedToDoItems(element) {
  if (element.parentElement.querySelector("div").style.textDecoration === "") {
    const img = document.createElement("img");
    img.src = "./img/checkmark.png";
    img.className = "todo-controls";
    element.parentElement.querySelector("div").style.textDecoration = "line-through";
    element.parentElement.querySelector("div").appendChild(img);
    element.parentElement.querySelector("img.edit").remove();

    todo.forEach((element) => {
      if (
        element.parentElement.querySelector("div").innerText.trim() == element.item
      ) {
        element.status = true;
      }
    });
    setLocalStorage();
    setAlertMessage("Todo item Completed Successfully!");
  }
}

function setLocalStorage() {
  localStorage.setItem("todo-list", JSON.stringify(todo));
}

//set alert message based on the user's activity
function setAlertMessage(message) {
  todoAlert.removeAttribute("class");
  todoAlert.innerText = message;
  setTimeout(() => {
    todoAlert.classList.add("togggleMe");
  }, 1000);
}
