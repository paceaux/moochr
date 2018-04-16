import Vue from 'vue';
import Vuex from 'vuex';
const apiGetTodos = 'http://localhost:3000/api/v1/todos';
const apiGetUsers = 'http://localhost:3000/api/v1/user';
const apiGetCategories = 'http://localhost:3000/api/v1/category';
const isServerSync = true;

function sendToApi (url, type, data, shouldAjax =  isServerSync) {
    return new Promise((resolve,reject) => {
        if (!shouldAjax) resolve(data);
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

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        todos: [],
        users: [],
        categories: [],
        isServerSync
    },
    getters: {
        userIndexById: state => (id) => state.users.findIndex(user => user.id == id)
    },
    mutations: {
        ADDUSER(state,user) {
            state.users.push(user);
        },
        UPDATEUSER(state, user) {
            const userIndex = this.getters.userIndexById(user.id);
            Vue.set(state.users, userIndex, user);
        },
        DELETEUSER(state,userIndex) {
            state.users.splice(userIndex,1);
        },
        ADDCATEGORY(state,category) {
            state.categories.push(category);
        },
        DELETECATEGORY(state,categoryIndex) {
            state.categories.splice(categoryIndex,1);
        },
        INITSTORE(state) {
            
        }
    },
    actions: {
        addUser({commit}, user) {
            sendToApi(apiGetUsers, 'POST', user, this.state.isServerSync)
            .then(res => {
                commit('ADDUSER', res);
            })
            .catch(err => {
                console.warn(err);
            });
        },
        updateUser({commit}, user) {
            sendToApi(`${apiGetUsers}/${user.id}`, 'PUT', user, this.state.isServerSync)
            .then(res => {
                console.info(res);
                commit('UPDATEUSER', user);
            })
            .catch(err => {
                console.warn(err);
            });
        },
        deleteUser({commit, store}, userId) {
            sendToApi(`${apiGetUsers}/${userId}`,'DELETE', undefined, this.state.isServerSync)
            .then(res => {
                const userIndex = this.getters.userIndexById(userId);
                commit('DELETEUSER', userIndex);
            })
            .catch(err => {
                console.warn(err);
            });
        },
        addCategory({commit}, category) {
            sendToApi(apiGetCategories, 'POST', category, this.state.isServerSync)
            .then(res => {
                console.info(res);
                this.commit('ADDCATEGORY', category);
            })
            .catch(err=> {
                console.warn(err);
            });
        },
        updateCategory({commit}, category) {
            sendToApi(`${apiGetCategories}/${category.id}`, 'PUT', category, this.state.isServerSync)
            .then(res => {
                console.info(res);
                commit('UPDATEUSER', category);
            })
            .catch(err => {
                console.warn(err);
            });
        },
        deleteCategory({commit}, categoryId) {
            sendToApi(`${apiGetUsers}/${categoryId}`,'DELETE', undefined, this.state.isServerSync)
            .then(res => {
                console.info(res);
                commit('DELETEUSER', categoryId);
            })
            .catch(err => {
                console.warn(err);
            });        
        },
        requestUsers({commit}) {
            sendToApi(apiGetUsers, 'GET')
            .then(users => {
                users.forEach(user => {
                    commit('ADDUSER', user);
                });
            })
            .catch(err=> {
                console.warn(err);
            });
        },
        requestCategories({commit}) {
            sendToApi(apiGetCategories, 'GET')
            .then(categories => {
                categories.forEach(category => {
                    commit('ADDCATEGORY', category);
                });
            })
            .catch(err=> {
                console.warn(err);
            });
        },
    }
});

// export default {
//     state: {
//         todos: [],
//         users: [],
//         categories: []
//     },
//     getUsers() {
//         return sendToApi(apiGetUsers, 'GET');
//     },
//     createUser(user) {
//         this.state.users.push(user);

//         sendToApi(apiGetUsers, 'POST', user).then(result => {
//             console.log('created', result);
//         });
//     },
//     updateUser(user) {
//             const apiUrl = `${apiGetUsers}/${user.id}`;

//             sendToApi(apiUrl, 'PUT', user)
//             .then(responseText => {
//                 console.log(responseText);
//             })
//             .catch(err=> {
//                 console.log(err);
//             });
        
//     },
//     deleteUser(id) {

//         this.state.users = this.state.users.filter( user => {
//             return user.id !== id;
//         });

//         sendToApi(`${apiGetUsers}/${id}`, 'DELETE').then(result => {
//             console.log(result);

//         });
//     },
//     getCategories() {
//         return sendToApi(apiGetCategories, 'GET');
//     },
//     createCategory(category) {
//         this.state.categories.push(category);

//         sendToApi(apiGetCategories, 'POST', category).then(result => {
//             console.log('created', result);
//         });
//     },
//     updateCategory(category) {
//             const apiUrl = `${apiGetCategories}/${category.id}`;

//             sendToApi(apiUrl, 'PUT', category)
//             .then(responseText => {
//                 console.log(responseText);
//             })
//             .catch(err=> {
//                 console.log(err);
//             });
        
//     },
//     deleteCategory(id) {

//         this.state.categories = this.state.categories.filter( category => {
//             return category.id !== id;
//         });

//         sendToApi(`${apiGetCategories}/${id}`, 'DELETE').then(result => {
//             console.log(result);
//         });
//     },
//    getTodos() {
//         return sendToApi(apiGetTodos, 'GET');
//     },
//     createTodo(todo) {
//         this.state.todos.push(todo);
//     },
//     updateTodo(todo) {
//         const id = todo.id;

//         const indexOfTodo = this.state.todos.findIndex((el) => {
//             return el.id == id;
//         });

//         if (indexOfTodo != -1) this.state.todos[indexOfTodo] = todo;
        
//     },
//     deleteTodo(id) {

//         this.state.todos = this.state.todos.filter( todo => {
//             return todo.id !== id;
//         });
//     }
// };