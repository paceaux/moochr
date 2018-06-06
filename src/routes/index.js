import VueRouter from 'vue-router';

import AdminRoutes from './admin';
import UserCards from '../components/UserCards.vue';
import UserProfile from '../components/UserProfile.vue';
import ItemCards from '../components/ItemCards.vue';
import LoginSection from '../components/LoginSection.vue';

const routes = [

    { path: '/users', component: UserCards },
    { path: '/user/:id', component: UserProfile, name: 'user' },
    { path: '/items/', component: ItemCards },
    { path: '/login/', component: LoginSection },
];

routes.push(...AdminRoutes);

const router = new VueRouter({
    routes,
});

export default router;
