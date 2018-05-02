import Vue from 'vue';
import VueRouter from 'vue-router';
import UserAdd from '../components/UserAdd.vue';
import UserList from '../components/UserTable.vue';
import CategoryList from '../components/CategoryTable.vue';
import CategoryAdd from '../components/CategoryAdd.vue';
import ItemAdd from '../components/ItemAdd.vue';
import ItemList from '../components/ItemTable.vue';

const routes = [
    {path: '/addUser', component: UserAdd},
    {path: '/userList', component: UserList},
    {path: '/addCategory', component: CategoryAdd},
    {path: '/categoryList', component: CategoryList},
    {path: '/addItem', component: ItemAdd},
    {path: '/itemList', component: ItemList}
];

const router = new VueRouter({
    routes
});

 export default router;