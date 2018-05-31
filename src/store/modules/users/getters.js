
export default {
    userIndexById: state => (id) => state.users.findIndex(user => user.id == id),
    userById: state => id => state.users.find(user => user.id == id),
};
