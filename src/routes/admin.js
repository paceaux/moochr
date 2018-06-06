import UserAdd from '../components/UserAdd.vue';
import UserList from '../components/UserTable.vue';
import CategoryList from '../components/CategoryTable.vue';
import CategoryAdd from '../components/CategoryAdd.vue';
import ItemAdd from '../components/ItemAdd.vue';
import ItemList from '../components/ItemTable.vue';

const basePath = '/admin';

export default [
    { path: `${basePath}/addUser`, component: UserAdd },
    { path: `${basePath}/userList`, component: UserList },
    { path: `${basePath}/addCategory`, component: CategoryAdd },
    { path: `${basePath}/categoryList`, component: CategoryList },
    { path: `${basePath}/addItem`, component: ItemAdd },
    { path: `${basePath}/itemList`, component: ItemList },
];
