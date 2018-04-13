import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import store from './store.js';
import router from './routes/index.js';

Vue.config.productionTip = false;
Vue.use(VueRouter);

store.subscribe((mutation, state) => {
    console.log('mutation observed', mutation);
    localStorage.setItem('store', JSON.stringify(state));
});
new Vue({
    el: '#VueMain',
    components: {App},
    template: '<App />',
    store,
    router,
    beforeCreate() {
        this.$store.dispatch('requestUsers');
        this.$store.dispatch('requestCategories');
    },
    mount() {

        // this.getTodos().then(todos => {
        //     todos.items.forEach(todo => {
        //         this.state.todos.push(todo);
        //     });
        // });

        // this.getUsers().then(users => {
        //     users.forEach(user => {
        //         this.state.users.push(user);
        //     });
        // });

        // this.getCategories().then(categories => {
        //     categories.forEach(category => {
        //         this.state.categories.push(category);
        //     });
        // });

    },
    destroyed() {

    }
});