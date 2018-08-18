const axios = require('axios');
import Vue from 'vue';
import Vuex from 'vuex';
import categories from './modules/categories/index';
import items from './modules/items/index';
import users from './modules/users/index';
import auth from './modules/auth/index';

const isServerSync = true;

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        categories,
        items,
        users,
        auth,
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
