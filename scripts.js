const todoValue = document.getElementById('todoText');
const todoAlert  = document.getElementById('Alert');
const listitem  = document.getElementById('list-items');
const addUpdate = document.getElementById('AddUpdateClick');


//declare local storage object
let todo = JSON.parse(localStorage.getItem("todo-list"));
if (!todo) {
  todo = [];
}