import Vue from 'vue';
import Vuex from 'vuex';
import categories from './modules/categories/index.js';
import items from './modules/items/index.js';
import users from './modules/users/index.js';

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
    modules: {
        categories,
        items,
        users,
    },
    state: {
        isServerSync,
    },
    getters: {

    },
    mutations: {
        INITSTORE() {

        },
    },
    actions: {

    },
});
