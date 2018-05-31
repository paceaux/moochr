import Vue from 'vue';

export default {
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
};
