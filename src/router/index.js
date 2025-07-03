import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/pages/Home/Home.vue';
import UsersList from '@/components/pages/UserList.vue';
import AddUser from '@/components/pages/AddUser.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/users', name: 'UsersList', component: UsersList },
  { path: '/add-user', name: 'AddUser', component: AddUser }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
