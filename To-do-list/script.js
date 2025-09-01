const addBtn = document.getElementById("add-btn");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const clearBtn = document.getElementById("clear-btn");
 
// add task
addBtn.addEventListener("click", () => {
  const task = todoInput.value.trim();
  if(task) {
    addTask(task);
    todoInput.value = "";
  }
});
 
// add task function
function addTask(task) {
  const li = document.createElement("li");
  li.innerHTML = `
    <span class="task-text">📝 ${task}</span>
    <button onclick="deleteTask(this)">❌</button>
  `;
 
  li.querySelector(".task-text").addEventListener("click", () => {
    li.classList.toggle("completed"); // toggle done
  });
 
  todoList.appendChild(li);
}
 
// delete task
function deleteTask(btn) {
  btn.parentElement.remove();
}
 
// clear all tasks
clearBtn.addEventListener("click", () => {
  todoList.innerHTML = "";
});
 
 