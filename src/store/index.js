import Vue from 'vue';
import Vuex from 'vuex';
import categories from './modules/categories/index.js';
import items from './modules/items/index.js';
import users from './modules/users/index.js';

const isServerSync = true;

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
