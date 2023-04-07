import {createRouter, createWebHashHistory} from "vue-router";

import IndexLayout from "../layout/IndexLayout.vue";
import LoginLayout from "../layout/LoginLayout.vue";

const mainRoutes = [
    {path: "/", name: "index", component: IndexLayout},
    {path: "/login", name: "login", component: LoginLayout}
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: mainRoutes
})

export default router