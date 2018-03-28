import Vue from 'vue';
import VueRouter from 'vue-router';
import UserAdd from '../components/UserAdd.vue';
import UserList from '../components/UserTable.vue';
import TodoList from '../components/TodoList.vue';
const routes = [
    {path: '/addUser', component: UserAdd},
    {path: '/userList', component: UserList},
    {path: '/todoList', component: TodoList}
];

const router = new VueRouter({
    routes
});

 export default router;