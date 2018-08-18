import Vue from 'vue';

export default {
    LOGIN(state, loginData) {
        state.isAuthenticated = true;
        state.token = loginData.token;
        state.currentUser = loginData.email;
        state.authenticationId = loginData.id;
    },
};
