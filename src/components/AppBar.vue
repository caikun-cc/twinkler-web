<template>
    <div class="root">
        <div class="logo-container">
            <p @click="navigationTo('index')">Twinkler</p>
        </div>
        <div class="right">
            <div class="menu-container">
                <ul>
                    <li v-for="item in menu">
                        <span onmouseover="this.style.cursor=' hand'" @click="navigationTo(item.route)">
                            {{ item.title }}
                        </span>
                    </li>
                </ul>
            </div>
            <!-- 用户一登录头像部分 -->
            <div class="user-container" v-show="isLogged" @click="navigationTo('console')"
                 v-loading.fullscreen.lock="fullscreenLoading">
                <img :src="user.avatar" alt="">
                <span>{{ user.nick }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import router from "../router/router.js";
import jwtDispatcher from "../utils/JwtDispatcher.js";
import {getUserDetails} from "../http/Apis.js";
import {ElMessage} from "element-plus";

export default {
    name: "AppBar",
    data() {
        return {
            menus: [],
            isLogged: false,
            user: {
                nick: "",
                avatar: "",
                id: 0,
            },
            fullscreenLoading: false
        }
    },
    mounted() {
        this.loadUserDetails()
    },
    computed: {
        menu() {
            if (this.isLogged) {
                this.menus = [{title: "上传", route: "upload"}]
            } else {
                this.menus = [
                    {title: "上传", route: "upload"},
                    {title: "登录", route: "login"}
                ]
            }
            return this.menus
        }
    },
    methods: {
        router() {
            return router
        },
        navigationTo(name) {
            router.push({name})
        },
        /**
         * 获取登录用户信息
         */
        loadUserDetails() {
            if (jwtDispatcher.getJwtSubject()) {
                this.fullscreenLoading = true
                getUserDetails().then(r => {
                    this.user.id = r.id
                    this.user.avatar = r.avatar
                    this.user.nick = r.nick
                    this.isLogged = true
                    this.fullscreenLoading = false
                }).catch(e => {
                    this.isLogged = false
                    ElMessage.error({message: e})
                    this.fullscreenLoading = false
                })
            }
        }
    }
}
</script>

<style scoped>
.root {
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
}

.logo-container {
    margin-left: 48px;
}

.logo-container > p {
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
    letter-spacing: 3px;
    cursor: pointer;
}

.right {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 48px;
}

.menu-container > ul {
    display: flex;
    list-style: none;
}

.menu-container > ul > li {
    color: white;
    font-size: 1rem;
    font-weight: bold;
    letter-spacing: 2px;
    margin: 0 12px;
    cursor: pointer;
}

.menu-container > ul > li:hover {
    color: #ff793f;
    transition-duration: 0.2s;
}

.user-container {
    margin-left: 12px;
    height: 32px;
    border-radius: 32px;
    padding: 2px;
    border: 2px rgba(255, 255, 255, 0.7) solid;
    display: flex;
    align-items: center;
    cursor: pointer;
}

.user-container:hover {
    border: 2px #ff793f solid;
    transition-duration: 0.5s;
}

.user-container > img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
}

.user-container > span {
    color: rgba(255, 255, 255, 0.8);
    margin-left: 8px;
    margin-right: 16px;
    font-size: 0.9rem;
}
</style>