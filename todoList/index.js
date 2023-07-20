let todoItemsContainer = document.getElementById("todoItemsContainer");
let todoList = [{
        text: "Learn HTML",
        uniqueId: 1
    },
    {
        text: "Learn CSS",
        uniqueId: 2
    },
    {
        text: "Learn JavaScript",
        uniqueId: 3
    }
];

let saveTodoButton = document.getElementById('saveTodoButton')
saveTodoButton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList))
}

function getTodoListFromLocalStorage() {
    let todoListFromLocal = localStorage.getItem("todoList")
    console.log(todoListFromLocal)
    let parseTodo = JSON.parse(todoListFromLocal)
    console.log(parseTodo)
    if (parseTodo === null) {
        return []
    } else {
        return parseTodo
    }
}

todoList = getTodoListFromLocalStorage();


function todoDelete(todoId) {
    let todoIdEl = document.getElementById(todoId)
    todoItemsContainer.removeChild(todoIdEl)
    let deletTodoListItem = todoList.findIndex((items) => {
        let itemsId = "todoId" + items.uniqueId
        if (todoId === itemsId) {
            return true
        } else {
            return false
        }
    })

    console.log(deletTodoListItem)
    todoList.splice(deletTodoListItem, 1)
}

function addTodoList() {

}

function todoStatusChanger(labelId) {
    let labelIdEl = document.getElementById(labelId)
    labelIdEl.classList.toggle("checked")
}

function createAndAppendTodo(todo) {

    let checkboxId = "checkboxId" + todo.uniqueId
    let labelId = "labeid" + todo.uniqueId
    let todoId = "todoId" + todo.uniqueId

    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoElement.id = todoId
    todoItemsContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.classList.add("checkbox-input");
    todoElement.appendChild(inputElement);


    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;
    labelElement.id = labelId
    labelContainer.appendChild(labelElement);

    inputElement.onclick = function() {
        todoStatusChanger(labelId)
    }

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIconContainer.appendChild(deleteIcon);

    deleteIcon.onclick = function() {
        todoDelete(todoId)
    }

}

let todoCount = todoList.length;

function addTodo() {
    let userInputElement = document.getElementById('todoUserInput')
    let userInputValue = userInputElement.value
    if (userInputValue === "") {
        alert("Enter Valid input")
        return;
    }
    todoCount = todoCount + 1;

    let newTodo = {
        text: userInputValue,
        uniqueId: todoCount
    }

    todoList.push(newTodo)

    createAndAppendTodo(newTodo);
    userInputElement.value = ""
}

let addTodoButonEl = document.getElementById('addTodoButon')
addTodoButonEl.onclick = function() {
    addTodo()
}


for (let todo of todoList) {
    createAndAppendTodo(todo);
}

getTodoListFromLocalStorage()