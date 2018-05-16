import Vue from 'vue';
import Vuex from 'vuex';
const apiGetUsers = '/api/v1/user';
const apiGetCategories = '/api/v1/category';
const apiGetItems = '/api/v1/item';
const isServerSync = true;

function sendToApi (url, type, data, shouldAjax =  isServerSync) {
    return new Promise((resolve,reject) => {
        if (!shouldAjax) resolve(data);
        var xhr = new XMLHttpRequest();
        xhr.open(type, url);
        xhr.onload = ()=> {
            if (xhr.status == 200) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                reject(JSON.parse(xhr.responseText));
            }
        };
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
        items: [],
        isServerSync
    },
    getters: {
        userIndexById: state => (id) => state.users.findIndex(user => user.id == id),
        userById: state => id => state.users.find(user => user.id == id),
        itemIndexById: state => (id) => state.items.findIndex(item => item.id == id),
        categoryIndexById: state => (id) => state.categories.findIndex(category => category.id == id),
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
        ADDITEM(state, item) {
            state.items.push(item);
        },
        UPDATEITEM(state, item) {
            const itemIndex = this.getters.itemIndexById(item.id);
            Vue.set(state.items, itemIndex, item);
        },
        DELETEITEM(state, itemIndex) {
            state.items.splice(itemIndex, 1);
        },
        ADDCATEGORY(state,category) {
            state.categories.push(category);
        },
        UPDATECATEGORY(state, category) {
            const catIndex = this.getters.categoryIndexById(category.id);
            Vue.set(state.categories, catIndex, category);
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
        addItem({commit}, item) {
            sendToApi(apiGetItems, 'POST', item, this.state.isServerSync)
            .then(res => {
                commit('ADDITEM', res);
            })
            .catch(err => {
                console.warn(err);
            });
        },
        updateItem({commit}, item) {
            sendToApi(`${apiGetItems}/${item.id}`, 'PUT', item, this.state.isServerSync)
            .then(res => {
                console.info(res);
                commit('UPDATEITEM', item);
            })
            .catch(err => {
                console.warn(err);
            });
        },
        deleteItem({commit, store}, itemId) {
            sendToApi(`${apiGetItems}/${itemId}`,'DELETE', undefined, this.state.isServerSync)
            .then(res => {
                const itemIndex = this.getters.itemIndexById(itemId);
                commit('DELETEITEM', itemIndex);
            })
            .catch(err => {
                console.warn(err);
            });
        },
        addCategory({commit}, category) {
            sendToApi(apiGetCategories, 'POST', category, this.state.isServerSync)
            .then(res => {
                this.commit('ADDCATEGORY', res);
            })
            .catch(err=> {
                console.warn('error',err);
            });
        },
        updateCategory({commit}, category) {
            sendToApi(`${apiGetCategories}/${category.id}`, 'PUT', category, this.state.isServerSync)
            .then(res => {
                commit('UPDATECATEGORY', category);
            })
            .catch(err => {
                console.warn(err);
            });
        },
        deleteCategory({commit}, categoryId) {
            sendToApi(`${apiGetCategories}/${categoryId}`,'DELETE', undefined, this.state.isServerSync)
            .then(res => {
                const catIndex = this.getters.categoryIndexById(categoryId);
                commit('DELETECATEGORY', catIndex);
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
        requestItems({commit}) {
            sendToApi(apiGetItems, 'GET')
            .then(items => {
                items.forEach(item => {
                    commit('ADDITEM', item);
                });
            })
            .catch(err=> {
                console.warn(err);
            });
        },
    }
});