import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import store from './store/index';
import router from './routes/index';

Vue.config.productionTip = false;
Vue.use(VueRouter);

store.subscribe((mutation, state) => {
    console.log('mutation observed', mutation);
    localStorage.setItem('store', JSON.stringify(state));
});
new Vue({
    el: '#VueMain',
    components: {App},
    template: '<app />',
    store,
    router,
    beforeCreate() {
        this.$store.dispatch('requestUsers');
        this.$store.dispatch('requestCategories');
        this.$store.dispatch('requestItems');
    },
    mount() {

    },
    destroyed() {

    }
});