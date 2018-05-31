
export default {
    categoryIndexById: state => (id) => state.categories.findIndex(category => category.id == id),
};
