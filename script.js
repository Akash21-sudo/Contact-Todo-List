// Contact Form Functionality
function sendContact() {
    const contactNumber = document.getElementById("contact-number").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (!contactNumber || !email || !message) {
        alert("Please fill in all fields");
        return;
    }

    alert(`Message sent!\nContact: ${contactNumber}\nEmail: ${email}\nMessage: ${message}`);

    // Clear form
    document.getElementById("contact-number").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";
}

// To-Do List Functionality
document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    function addTask() {
        if (!taskInput.value) {
            alert("Please enter a task");
            return;
        }

        const li = document.createElement("li");
        li.textContent = taskInput.value;

        const span = document.createElement("span");
        span.textContent = "×";
        span.onclick = (e) => {
            e.stopPropagation();
            li.remove();
            saveTasks();
        };

        li.appendChild(span);
        li.onclick = () => {
            li.classList.toggle("checked");
            saveTasks();
        };

        taskList.appendChild(li);
        taskInput.value = "";
        saveTasks();
    }

    function saveTasks() {
        localStorage.setItem("tasks", taskList.innerHTML);
    }

    function loadTasks() {
        const savedTasks = localStorage.getItem("tasks");
        if (savedTasks) {
            taskList.innerHTML = savedTasks;

            document.querySelectorAll("#task-list li").forEach(li => {
                li.onclick = () => {
                    li.classList.toggle("checked");
                    saveTasks();
                };

                const span = li.querySelector("span");
                if (span) {
                    span.onclick = (e) => {
                        e.stopPropagation();
                        li.remove();
                        saveTasks();
                    };
                }
            });
        }
    }

    loadTasks();

    taskInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            addTask();
        }
    });

    // Make addTask accessible globally for inline onclick
    window.addTask = addTask;
});
