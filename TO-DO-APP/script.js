document.addEventListener("DOMContentLoaded", () => {
  let toDoInput = document.getElementById("to-do-input");
  let toDoList = document.getElementById("to-do-list");
  let addButton = document.getElementById("to-do-add");
  let tasks = JSON.parse(localStorage.getItem("task")) || [];

  renderAllTasks();

  addButton.addEventListener("click", () => {
    let taskText = toDoInput.value.trim();
    if (taskText === "") return;

    let newTask = {
      id: Date.now(),
      text: taskText,
      done: false,
    };

    tasks.push(newTask);
    toDoInput.value = "";
    saveTasks();
    renderAllTasks();
  });

  function renderAllTasks() {
    toDoList.innerHTML = ""; // Clear the list
    tasks.forEach((task) => renderTask(task));
  }

  function renderTask(task) {
    let li = document.createElement("li");
    li.id = task.id;

    if (task.done) {
      li.classList.add("completed");
    }

    li.innerHTML = `
      <span>${task.text}</span>
      <button>Remove</button>
    `;

    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;

      task.done = !task.done;
      saveTasks();
      renderAllTasks();
    });

    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation();
      tasks = tasks.filter((t) => t.id !== task.id);
      saveTasks();
      renderAllTasks();
    });

    toDoList.appendChild(li);
  }

  function saveTasks() {
    localStorage.setItem("task", JSON.stringify(tasks));
  }
});
