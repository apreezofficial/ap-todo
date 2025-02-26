document.addEventListener("DOMContentLoaded", () => {
    // 🔥 Preloader
    setTimeout(() => {
        document.querySelector(".preloader").classList.add("hidden");
    }, 1500);

    // 🎭 Login & Signup System
    const formTitle = document.getElementById("formTitle");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const submitBtn = document.getElementById("submitBtn");
    const switchText = document.getElementById("switchText");
    const message = document.getElementById("message");
    const container = document.querySelector(".container");
    const todoSection = document.getElementById("todoSection");
    const profileIcon = document.getElementById("profileIcon");

    let users = JSON.parse(localStorage.getItem("users")) || {};
    let currentUser = localStorage.getItem("currentUser");
    let mode = "login";

    // 🚀 If user is already logged in, go straight to To-Do
    if (currentUser) {
        container.style.display = "none";
        todoSection.style.display = "block";
        profileIcon.textContent = currentUser.charAt(0).toUpperCase();
        profileIcon.style.display = "flex"; // Show profile icon
    } else {
        profileIcon.style.display = "none"; // Hide profile icon if no user
    }

    switchText.addEventListener("click", () => {
        mode = mode === "login" ? "signup" : "login";
        formTitle.textContent = mode === "login" ? "Login" : "Sign Up";
        submitBtn.textContent = mode === "login" ? "Login" : "Sign Up";
        switchText.innerHTML = mode === "login"
            ? `Don't have an account? <span class="switch-btn">Sign Up</span>`
            : `Already have an account? <span class="switch-btn">Login</span>`;
    });

    submitBtn.addEventListener("click", () => {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (username === "" || password === "") {
            message.textContent = "⚠️ Fill all fields!";
            message.classList.add("shake");
            setTimeout(() => message.classList.remove("shake"), 500);
            return;
        }

        if (mode === "signup") {
            if (users[username]) {
                message.textContent = "⚠️ Username already exists!";
                return;
            }
            users[username] = password;
            localStorage.setItem("users", JSON.stringify(users));
            message.textContent = "✅ Account created! Please login.";
            mode = "login"; // Switch to login after signup
            formTitle.textContent = "Login";
            submitBtn.textContent = "Login";
            switchText.innerHTML = `Don't have an account? <span class="switch-btn">Sign Up</span>`;
        } else {
            if (!users[username] || users[username] !== password) {
                message.textContent = "❌ Incorrect username or password!";
                return;
            }

            // 🔵 Save logged-in user & go to To-Do list
            localStorage.setItem("currentUser", username);
            setTimeout(() => {
                container.style.display = "none";
                todoSection.style.display = "block";
                profileIcon.textContent = username.charAt(0).toUpperCase();
                profileIcon.style.display = "flex"; // Show profile icon
            }, 1000);
        }
    });

    // ✅ To-Do List Functionality
    const todoInput = document.getElementById("todoInput");
    const addToDo = document.getElementById("addToDo");
    const todoList = document.getElementById("todoList");

    let todos = JSON.parse(localStorage.getItem("todos")) || [];

    function renderToDos() {
        todoList.innerHTML = "";
        todos.forEach((todo, index) => {
            const li = document.createElement("li");
            li.innerHTML = `<span>${todo}</span>`;

            // 🗑️ Delete button (recycling bin)
            const delBtn = document.createElement("button");
            delBtn.innerHTML = "🗑️";
            delBtn.classList.add("delete-btn");
            delBtn.onclick = () => {
                todos.splice(index, 1);
                localStorage.setItem("todos", JSON.stringify(todos));
                renderToDos();
            };

            // ✏️ Edit button
            const editBtn = document.createElement("button");
            editBtn.innerHTML = "✏️";
            editBtn.classList.add("edit-btn");
            editBtn.onclick = () => {
                const newTask = prompt("Edit your task:", todo);
                if (newTask) {
                    todos[index] = newTask;
                    localStorage.setItem("todos", JSON.stringify(todos));
                    renderToDos();
                }
            };

            li.appendChild(editBtn);
            li.appendChild(delBtn);
            todoList.appendChild(li);
        });
    }

    addToDo.addEventListener("click", () => {
        const task = todoInput.value.trim();
        if (task !== "") {
            todos.push(task);
            localStorage.setItem("todos", JSON.stringify(todos));
            renderToDos();
            todoInput.value = "";
        }
    });

    renderToDos();

    // 🎭 Theme Toggle Functionality
    const themeDark = document.getElementById("themeDark");
    const themeLight = document.getElementById("themeLight");
    const themeCyber = document.getElementById("themeCyber");

    function setTheme(theme) {
        document.body.className = theme;
        localStorage.setItem("theme", theme);
    }

    themeDark.addEventListener("change", () => setTheme("dark"));
    themeLight.addEventListener("change", () => setTheme("light"));
    themeCyber.addEventListener("change", () => setTheme("cyber"));

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setTheme(savedTheme);
});