export default {
    LOGIN(state, loginData) {
        state.isAuthenticated = true;
        state.currentUser = loginData.email;
        state.authenticationId = loginData.id;
    },
    UPDATETOKEN(state, newToken) {
        localStorage.setItem('MUT', newToken);
        state.token = newToken;
    },
    REMOVETOKEN(state) {
        localStorage.removeItem('MUT');
        state.token = null;
    },
};
