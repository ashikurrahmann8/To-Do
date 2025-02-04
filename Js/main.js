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
  tasks.map((task, index) => {
    const taskElm = document.createElement("li");
    taskElm.classList.add("task");
    taskElm.innerHTML = `
    <span class="task-name">${task.task}</span>
            <div class="task-actions">
              <button class="edit-btn" onclick = "editTask(${index})">Edit</button>
              <button class="delete-btn" onclick = "deleteTask(${index})">Delete</button>
              <button class="complete-btn" onclick = "completeTask(${index})">Complete</button>
              <button class="undo-btn" onclick = "undoTask(${index})">Undo</button>
            </div>
            `;
    tasklistElm.appendChild(taskElm);
  });
  messageElm.textContent = tasks.length === 0 ? "No task available" : "";
};
renderTasks();
addEventListeners();
