export default {
    itemIndexById: state => (id) => state.items.findIndex(item => item.id == id),
};
