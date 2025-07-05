import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/pages/Home/Home.vue';
import UserList from '@/components/pages/UserList.vue';
import AddUser from '@/components/pages/AddUser.vue';
import EditUser from '@/components/pages/EditUser.vue';
const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/users', name: 'UsersList', component: UserList },
  { path: '/add-user', name: 'AddUser', component: AddUser },
  { path: '/edit-user/:id', name: 'EditUser', component: EditUser }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
