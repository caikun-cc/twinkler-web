<template>
    <div class="root">
        <div class="logo-container">
            <p @click="navigationTo('index')">Twinkler</p>
        </div>
        <div class="right">
            <div class="menu-container">
                <ul>
                    <li v-for="item in menu">
                        <span onmouseover="this.style.cursor=' hand'"
                              @click="navigationTo(item.route)">
                            {{ item.title }}
                        </span>
                    </li>
                </ul>
            </div>
            <!-- 用户一登录头像部分 -->
            <div class="user-container" v-show="isLogged" @click="jumpToConsole"
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
import {refresh} from "../http/HttpClient.js";

export default {
    name: "AppBar",
    data() {
        return {
            menus: [],
            isLogged: false,
            user: {
                nick: "",
                avatar: "https://cloud.caikun.site/f/kWfW/defaultAvatar.jpg",
                id: 0,
            },
            fullscreenLoading: false
        }
    },
    mounted() {
        let jwtUser = jwtDispatcher.getUserDetails()
        if (jwtUser) {
            this.user.id = jwtUser.id
            this.user.avatar = jwtUser.avatar
            this.user.nick = jwtUser.nick
        } else {
            this.loadUserDetails()
        }
    },
    computed: {
        menu() {
            if (jwtDispatcher.getJwtSubject() != null) {
                this.menus = [{title: "上传", route: "upload"}]
                this.isLogged = true
            } else {
                this.menus = [
                    {title: "上传", route: "upload"},
                    {title: "登录", route: "login"}
                ]
                this.isLogged = false
            }
            return this.menus
        }
    },
    methods: {
        navigationTo(name) {
            router.push({name})
        },

        /**
         * 点击去管理后台
         */
        jumpToConsole() {
            if (this.user.id !== 0) {
                if (!jwtDispatcher.isAvailable()) {
                    const {refreshToken} = jwtDispatcher.getJwtSubject()
                    this.fullscreenLoading = true
                    refresh(refreshToken).then(r => {
                        ElMessage.success({message: "已刷新！"})
                        jwtDispatcher.save(r)
                        router.push({name: "console"})
                    }).catch(e => {
                        ElMessage.error({message: "登陆失败: " + e.message})
                        router.push({name: "login"})
                    })
                } else router.push({name: "console"})
            } else router.push({name: "login"})
        },
        /**
         * 获取登录用户信息
         */
        loadUserDetails() {
            if (jwtDispatcher.getJwtSubject()) {
                getUserDetails().then(r => {
                    this.user.id = r.id
                    this.user.avatar = r.avatar
                    this.user.nick = r.nick
                }).catch(e => {
                    ElMessage.error({message: e})
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