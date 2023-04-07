import {createRouter, createWebHashHistory} from "vue-router";

import IndexLayout from "../layout/IndexLayout.vue";
import LoginLayout from "../layout/LoginLayout.vue";
import ConsoleLayout from "../layout/ConsoleLayout.vue";
import HomeContainer from "../components/HomeContainer.vue";
import Uploader from "../components/Uploader.vue";

const indexRoutes = [
    {path: "/", name: "index", component: HomeContainer},
    {path: "/upload", name: "upload", component: Uploader}
]

const mainRoutes = [
    {path: "/", component: IndexLayout, children: indexRoutes},
    {path: "/login", name: "login", component: LoginLayout},
    {path: "/console", name: "console", component: ConsoleLayout}
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: mainRoutes
})

export default router