import Vue from 'vue';
import Vuex from 'vuex';

const axios = require('axios');

const apiGetUser = '/api/v1/user';
const apiGetUsers = '/api/v1/users';
const apiGetCategory = '/api/v1/category';
const apiGetCategories = '/api/v1/categories';
const apiGetItem = '/api/v1/item';
const apiGetItems = '/api/v1/items';
const isServerSync = true;

function sendToApi(url, type, data, shouldAjax = isServerSync) {
    return new Promise((resolve, reject) => {
        if (!shouldAjax) resolve(data);
        const xhr = new XMLHttpRequest();
        xhr.open(type, url);
        xhr.onload = () => {
            if (xhr.status === 200) {
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
        isServerSync,
    },
    getters: {
        userIndexById: state => (id) => state.users.findIndex(user => user.id == id),
        userById: state => id => state.users.find(user => user.id == id),
        itemIndexById: state => (id) => state.items.findIndex(item => item.id == id),
        categoryIndexById: state => (id) => state.categories.findIndex(category => category.id == id),
    },
    mutations: {
        ADDUSER(state, user) {
            state.users.push(user);
        },
        UPDATEUSER(state, user) {
            const userIndex = this.getters.userIndexById(user.id);
            Vue.set(state.users, userIndex, user);
        },
        DELETEUSER(state, userIndex) {
            state.users.splice(userIndex, 1);
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
        ADDCATEGORY(state, category) {
            state.categories.push(category);
        },
        UPDATECATEGORY(state, category) {
            const catIndex = this.getters.categoryIndexById(category.id);
            Vue.set(state.categories, catIndex, category);
        },
        DELETECATEGORY(state, categoryIndex) {
            state.categories.splice(categoryIndex, 1);
        },
        INITSTORE() {

        },
    },
    actions: {
        addUser({ commit }, user) {
            sendToApi(apiGetUser, 'POST', user, this.state.isServerSync)
                .then(res => {
                    commit('ADDUSER', res);
                })
                .catch(err => {
                    console.warn(err);
                });
        },
        updateUser({ commit }, user) {
            sendToApi(`${apiGetUser}/${user.id}`, 'PUT', user, this.state.isServerSync)
                .then(res => {
                    console.info(res);
                    commit('UPDATEUSER', user);
                })
                .catch(err => {
                    console.warn(err);
                });
        },
        deleteUser({ commit }, userId) {
            sendToApi(`${apiGetUser}/${userId}`, 'DELETE', undefined, this.state.isServerSync)
                .then(() => {
                    const userIndex = this.getters.userIndexById(userId);
                    commit('DELETEUSER', userIndex);
                })
                .catch(err => {
                    console.warn(err);
                });
        },
        addItem({ commit }, item) {
            sendToApi(apiGetItem, 'POST', item, this.state.isServerSync)
                .then(res => {
                    commit('ADDITEM', res);
                })
                .catch(err => {
                    console.warn(err);
                });
        },
        updateItem({ commit }, item) {
            sendToApi(`${apiGetItem}/${item.id}`, 'PUT', item, this.state.isServerSync)
                .then(res => {
                    console.info(res);
                    commit('UPDATEITEM', item);
                })
                .catch(err => {
                    console.warn(err);
                });
        },
        deleteItem({ commit }, itemId) {
            sendToApi(`${apiGetItem}/${itemId}`, 'DELETE', undefined, this.state.isServerSync)
                .then(() => {
                    const itemIndex = this.getters.itemIndexById(itemId);
                    commit('DELETEITEM', itemIndex);
                })
                .catch(err => {
                    console.warn(err);
                });
        },
        addCategory({ commit }, category) {
            axios.post(apiGetCategory, category)
                .then(res => {
                    commit('ADDCATEGORY', res.data);
                })
                .catch(err => {
                    console.warn('error', err);
                });
        },
        updateCategory({ commit }, category) {
            axios.put(`${apiGetCategory}/${category.id}`, category)
                .then(() => {
                    commit('UPDATECATEGORY', category);
                })
                .catch(err => {
                    console.warn(err);
                });
        },
        deleteCategory({ commit }, categoryId) {
            axios.delete(`${apiGetCategory}/${categoryId}`)
                .then((res) => {
                    if (res.status === 200) {
                        const catIndex = this.getters.categoryIndexById(categoryId);
                        commit('DELETECATEGORY', catIndex);
                    }
                })
                .catch(err => {
                    console.warn(err);
                });
        },
        requestUsers({ commit }) {
            axios.get(apiGetUsers)
                .then(res => {
                    res.data.forEach(user => {
                        commit('ADDUSER', user);
                    });
                })
                .catch(err => {
                    console.warn(err);
                });
        },
        requestCategories({ commit }) {
            axios.get(apiGetCategories)
                .then(res => {
                    res.data.forEach(category => {
                        commit('ADDCATEGORY', category);
                    });
                })
                .catch(err => {
                    console.warn(err);
                });
        },
        requestItems({ commit }) {
            axios.get(apiGetItems)
                .then(res => {
                    res.data.forEach(item => {
                        commit('ADDITEM', item);
                    });
                })
                .catch(err => {
                    console.warn(err);
                });
        },
    },
});
