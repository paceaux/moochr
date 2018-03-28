const apiGetTodos = 'http://localhost:3000/api/v1/todos';
const apiGetUsers = 'http://localhost:3000/api/v1/user';
const apiGetCategories = 'http://localhost:3000/api/v1/category';

function sendToApi (url, type, data) {
    return new Promise((resolve,reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open(type, url);
        xhr.onload = ()=> resolve(JSON.parse(xhr.responseText));
        xhr.onerror = () => reject(xhr.statusText);
        if (data) {
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(data));
        } else {
            xhr.send();
        }
    });
}

export default {
    state: {
        todos: [],
        users: [],
        categories: []
    },
    getUsers() {
        return sendToApi(apiGetUsers, 'GET');
    },
    createUser(user) {
        this.state.users.push(user);

        sendToApi(apiGetUsers, 'POST', user).then(result => {
            console.log('created', result);
        });
    },
    updateUser(user) {
            const apiUrl = `${apiGetUsers}/${user.id}`;

            sendToApi(apiUrl, 'PUT', user)
            .then(responseText => {
                console.log(responseText);
            })
            .catch(err=> {
                console.log(err);
            });
        
    },
    deleteUser(id) {

        this.state.users = this.state.users.filter( user => {
            return user.id !== id;
        });

        sendToApi(`${apiGetUsers}/${id}`, 'DELETE').then(result => {
            console.log(result);

        });
    },
    getCategories() {
        return sendToApi(apiGetCategories, 'GET');
    },
    createCategory(category) {
        this.state.categories.push(category);

        sendToApi(apiGetCategories, 'POST', category).then(result => {
            console.log('created', result);
        });
    },
    updateCategory(category) {
            const apiUrl = `${apiGetCategories}/${category.id}`;

            sendToApi(apiUrl, 'PUT', category)
            .then(responseText => {
                console.log(responseText);
            })
            .catch(err=> {
                console.log(err);
            });
        
    },
    deleteCategory(id) {

        this.state.categories = this.state.categories.filter( category => {
            return category.id !== id;
        });

        sendToApi(`${apiGetCategories}/${id}`, 'DELETE').then(result => {
            console.log(result);
        });
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