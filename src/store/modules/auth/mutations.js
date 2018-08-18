import Vue from 'vue';

export default {
    LOGIN(state, loginData) {
        console.log('logged in?', loginData);
        Vue.set(state.isAuthenticated, true);
        Vue.set(state.token, loginData.token);
    },
};
