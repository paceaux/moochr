import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import Store from './store.js';
import router from './routes/index.js';

Vue.config.productionTip = false;
Vue.use(VueRouter);
new Vue({
    el: '#VueMain',
    components: {App},
    template: '<App />',
    data: Store,
    router,
    mounted() {
        this.getTodos().then(todos => {
            todos.items.forEach(todo => {
                this.state.todos.push(todo);
            });
        });

        this.getUsers().then(users => {
            users.forEach(user => {
                this.state.users.push(user);
            });
        });

    }
});