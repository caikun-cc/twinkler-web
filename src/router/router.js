import {createRouter, createWebHashHistory} from "vue-router";

import IndexLayout from "../layout/IndexLayout.vue";
import LoginLayout from "../layout/LoginLayout.vue";
import ConsoleLayout from "../layout/ConsoleLayout.vue";
import Uploader from "../components/Uploader.vue";
import Home from "../components/console/Home.vue";
import IndexContainer from "../components/index/IndexContainer.vue";

const indexRoutes = [
    {path: "/", name: "index", component: IndexContainer},
    {path: "/upload", name: "upload", component: Uploader}
]

const consoleRoutes = [
    {path: '/', name: 'console', component: Home}
]

const mainRoutes = [
    {path: "/", component: IndexLayout, children: indexRoutes},
    {path: "/login", name: "login", component: LoginLayout},
    {path: "/console", component: ConsoleLayout, children: consoleRoutes}
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: mainRoutes
})

export default router