import Vue from 'vue';

export default {
    ADDCATEGORY(state, category) {
        state.categories.push(category);
    },
    UPDATECATEGORY(state, category) {
        const catIndex = this.getters.categoryIndexById(category.id);
        Vue.set(state.categories, catIndex, category);
    },
    DELETECATEGORY(state, categoryIndex) {
        state.categories.splice(categoryIndex, 1);
    },
};
