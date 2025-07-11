import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import UserList from "@/views/UserList.vue";
import EditUser from "@/views/EditUser.vue";

const routes = [
  { path: "/", name: "Home", component: Home, meta: { title: "Home" } },
  {
    path: "/users",
    name: "UsersList",
    component: UserList,
    meta: { title: "User List" },
  },
  {
    path: "/edit-user/:id",
    name: "EditUser",
    component: EditUser,
    meta: { title: "Edit User" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title || "Fitpanel"} | Fitpanel`;
  next();
});

export default router;
