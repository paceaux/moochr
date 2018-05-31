import Vue from 'vue';

export default {
    ADDITEM(state, item) {
        state.items.push(item);
    },
    UPDATEITEM(state, item) {
        const itemIndex = this.getters.itemIndexById(item.id);
        Vue.set(state.items, itemIndex, item);
    },
    DELETEITEM(state, itemIndex) {
        state.items.splice(itemIndex, 1);
    },
};
