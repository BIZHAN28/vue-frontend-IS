import { createRouter, createWebHistory } from 'vue-router'
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import CitiesView from "@/views/CitiesView.vue";
import AdminRequestsView from "@/views/AdminRequestsView.vue";
import AddCityView from "@/views/AddCityView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: LoginView,
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterView,
        },
        {
            path: '/cities',
            name: 'cities',
            component: CitiesView,
        },
        {
            path: '/requests',
            name: 'requests',
            component: AdminRequestsView,
        },
        {
            path: '/add-city',
            name: 'add-city',
            component: AddCityView,
        }
    ],
})
router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('authToken');

    if (isAuthenticated && (to.path === '/login' || to.path === '/register')) {
        next('/');
    } else if (!isAuthenticated  && !(to.path === '/login' || to.path === '/register')) {
        next("/login");
    } else {
        next();
    }
});
export default router
