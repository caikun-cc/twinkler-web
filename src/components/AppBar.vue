<template>
    <div class="root">
        <div class="logo-container">
            <p @click="navigationTo('index')">Twinkler</p>
        </div>
        <div class="right">
            <div class="menu-container">
                <ul>
                    <li v-for="item in menus" @click="navigationTo(item.route)">{{ item.title }}</li>
                </ul>
            </div>
            <div class="user-container" v-show="true">
                <img src="https://cloud.caikun.site/f/76sn/avatar.jpg" alt="">
                <span>天上的星</span>
            </div>
        </div>
    </div>
</template>

<script>
import router from "../router/router.js";

export default {
    name: "AppBar",
    data() {
        return {
            menus: [
                {title: "广场", route: "index"},
                {title: "上传", route: "upload"},
                //{title: "登录", route: "login"}
            ]
        }
    },
    methods: {
        navigationTo(name) {
            router.push({name})
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
}

.menu-container > ul > li:hover {
    color: #686de0;
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
}

.user-container:hover {
    border: 2px white solid;
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