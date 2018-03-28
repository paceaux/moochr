import Vue from 'vue';
import VueRouter from 'vue-router';
import UserAdd from '../components/UserAdd.vue';
import UserList from '../components/UserTable.vue';
import TodoList from '../components/TodoList.vue';
import CategoryList from '../components/CategoryTable.vue';
import CategoryAdd from '../components/CategoryAdd.vue';
const routes = [
    {path: '/addUser', component: UserAdd},
    {path: '/userList', component: UserList},
    {path: '/todoList', component: TodoList},
    {path: '/addCategory', component: CategoryAdd},
    {path: '/categoryList', component: CategoryList}
];

const router = new VueRouter({
    routes
});

 export default router;