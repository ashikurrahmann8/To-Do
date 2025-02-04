const searchElm = document.querySelector(".search-input");
const inputElm = document.querySelector(".task-input");
const addBtnElm = document.querySelector(".add-btn");
const tasklistElm = document.querySelector(".task-list");
const editBtnElm = document.querySelector(".edit-btn");
const deleteBtnElm = document.querySelector(".delete-btn");
const undoBtnElm = document.querySelector(".undo-btn");
const completeBtnElm = document.querySelector(".complete-btn");
const messageElm = document.querySelector(".message");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const addEventListeners = () => {
  addBtnElm.addEventListener("click", addTask);
  inputElm.addEventListener("input", inputChanges);

  //   searchElm.addEventListener("input", searchTask);
};

const inputChanges = () => {
  messageElm.textContent = "";
};

const addTask = () => {
  const task = inputElm.value;
  const id = tasks.length + 1;
  if (task === "") {
    messageElm.textContent = "Please enter a task";
    return;
  }
  tasks.push({ id, task, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
  inputElm.value = "";
};

const renderTasks = () => {
  tasklistElm.innerHTML = "";
  tasks.map((task) => {
    const taskElm = document.createElement("li");
    taskElm.classList.add("task");
    taskElm.innerHTML = `
    <span class="task-name">${task.task}</span>
            <div class="task-actions">
              <button class="edit-btn" onclick = "editTask(${task.id})">Edit</button>
              <button class="delete-btn" onclick = "deleteTask(${task.id})">Delete</button>
              <button class="complete-btn" onclick = "completeTask(${task.id})">Complete</button>
              <button class="undo-btn" onclick = "undoTask(${task.id})">Undo</button>
            </div>
            `;
    tasklistElm.appendChild(taskElm);
  });
  messageElm.textContent = tasks.length === 0 ? "No task available" : "";
};

const deleteTask = (id) => {
  tasks = tasks.filter((task) => task.id !== id);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
};

renderTasks();
addEventListeners();
