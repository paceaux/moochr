import Vue from 'vue';
import App from './App.vue';
import Store from './store.js';

Vue.config.productionTip = false;

new Vue({
    el: '#VueMain',
    components: {App},
    template: '<App />',
    data: Store,
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