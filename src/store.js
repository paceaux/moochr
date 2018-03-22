const apiGetTodos = 'http://localhost:3000/api/v1/todos';

function sendToApi (url, type='GET') {
    return new Promise((resolve,reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open(type, url);
        xhr.onload = ()=> resolve(JSON.parse(xhr.responseText));
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send();
    });
}

export default {
    state: {
        todos: []
    },
   getTodos() {
        return sendToApi(apiGetTodos, 'GET');
    },
    createTodo(todo) {
        this.state.todos.push(todo);
    },
    updateTodo(todo) {
        const id = todo.id;

        const indexOfTodo = this.state.todos.findIndex((el) => {
            return el.id == id;
        });

        if (indexOfTodo != -1) this.state.todos[indexOfTodo] = todo;
        
    },
    deleteTodo(id) {

        this.state.todos = this.state.todos.filter( todo => {
            return todo.id !== id;
        });
    }
};