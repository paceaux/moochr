const axios = require('axios');
import Vue from 'vue';
import Vuex from 'vuex';
import categories from './modules/categories/index';
import items from './modules/items/index';
import users from './modules/users/index';

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
        token: '',
        isAuthenticated: false,
    },
    getters: {

    },
    mutations: {
        INITSTORE() {

        },
        LOGIN(state, loginData) {
            console.log('logged in?', loginData);
            Vue.set(state.isAuthenticated, true);
            Vue.set(state.token, loginData.token);
        },
    },
    actions: {
        login({ commit }, user) {
            axios.post('/login', user)
                .then(res => {
                    if (res.status === 201) {
                        commit('LOGIN', res.body);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
    },
});
