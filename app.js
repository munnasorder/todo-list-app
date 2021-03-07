// get input value and save to localStorage
document.getElementById('form').addEventListener('submit', submitForm)

function submitForm (e) {
    const todo =  document.getElementById('userTodo').value;
    const status = 'Open'
    const id = Math.round(Math.random() * 10000) + '';

    const issue = {todo, status, id};

    let issues = [];
    if (localStorage.getItem('issues')) {
        issues = JSON.parse(localStorage.getItem('issues'))
    }
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));

    document.getElementById('form').reset();
    showTodo();
    e.preventDefault();
}


//status update function
const statusUpdate = id => {
    const todoList = JSON.parse(localStorage.getItem('issues'));
    const todo = todoList.find(todo => todo.id === id)
    todo.status = 'Closed';
    localStorage.setItem('issues', JSON.stringify(todoList));
    showTodo();
}

//delete single todo function
const deleteTodo = id => {
    const todoList = JSON.parse(localStorage.getItem('issues'));
    const remainingTodo = todoList.filter(todo => todo.id !== id)
    localStorage.setItem('issues', JSON.stringify(remainingTodo));
    showTodo();
}

// show todo list
function showTodo (){
    const issues = JSON.parse(localStorage.getItem('issues'))
    const showTodo = document.getElementById('show-todo-list')
    showTodo.innerHTML = '';
    issues.forEach(data => {
        showTodo.innerHTML += `
        <div class="todo-list">
            <div class="todo-item d-flex justify-content-between align-items-center">
                <div class="d-flex">
                    <h5>${data.todo}</h5>
                    <small class="status-btn">${data.status}</small>
                </div>
                <div class="status">
                    <button  onclick="statusUpdate('${data.id}')" class="btn btn-primary"><i class="fa fa-window-close" aria-hidden="true"></i>
                    </button>
                    <button  onclick="deleteTodo('${data.id}')" class="btn btn-danger"><i class="fa fa-trash" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </div>
        `
    })
}