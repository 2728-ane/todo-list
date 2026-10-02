const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        li.classList.add("task");

        if (task.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `
            <span>${task.text}</span>

            <div class="task-buttons">
                <button class="complete-btn" onclick="completeTask(${index})">
                    ✓
                </button>

                <button class="delete-btn" onclick="deleteTask(${index})">
                    🗑
                </button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        return;
    }

    tasks.push({
        text: taskText,
        completed: false
    });

    saveTasks();

    taskInput.value = "";

    displayTasks();
}

function completeTask(index) {
    tasks[index].completed = !tasks[index].completed;

    saveTasks();

    displayTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);

    saveTasks();

    displayTasks();
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

displayTasks();