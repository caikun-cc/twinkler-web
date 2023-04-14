import {createRouter, createWebHashHistory} from "vue-router";
import jwtSubject from "../utils/JwtSubject.js";

import IndexLayout from "../layout/IndexLayout.vue";
import AccountLayout from "../layout/AccountLayout.vue";
import ConsoleLayout from "../layout/ConsoleLayout.vue";

import Uploader from "../components/Uploader.vue";
import Login from "../components/account/Login.vue";
import Register from "../components/account/Register.vue";
import IndexContainer from "../components/index/IndexContainer.vue";
import Home from "../components/console/Home.vue";
import Galleries from "../components/console/Galleries.vue";
import Albums from "../components/console/Albums.vue";
import Member from "../components/console/Member.vue";
import Settings from "../components/console/Settings.vue";

/**
 * 主页
 */
const indexRoutes = [
    {path: "", name: "index", component: IndexContainer},
    {path: "upload", name: "upload", component: Uploader}
]

/**
 * 账户
 */
const accountRoutes = [
    {path: "", name: "login", component: Login},
    {path: "register", name: "register", component: Register},
]

/**
 * 管理后台
 */
const consoleRoutes = [
    {path: "", name: "console", component: Home},
    {path: "galleries", name: "galleries", component: Galleries},
    {path: "albums", name: "albums", component: Albums},
    {path: "member", name: "member", component: Member},
    {path: "settings", name: "settings", component: Settings}
]

/**
 * 根路由
 */
const mainRoutes = [
    {path: "/", component: IndexLayout, children: indexRoutes},
    {path: "/account", component: AccountLayout, children: accountRoutes},
    {
        path: "/console", component: ConsoleLayout, children: consoleRoutes, meta: {
            isAuth: true
        }
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: mainRoutes
})

/**
 * 路由守卫，判断登录状态跳转到登录页
 */
router.beforeEach((to, from, next) => {
    if (to.matched.some(r => r.meta.isAuth)) {
        if (jwtSubject.obtainDetails()) {
            next()
        } else {
            next({name: 'login'})
        }
    } else {
        next()
    }
})

export default router