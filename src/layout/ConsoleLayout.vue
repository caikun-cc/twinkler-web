<template>
    <el-container class="console-root">
        <el-aside width="240px">
            <div class="logo-side-container"
                 @click="navigationTo('index')"
                 style="cursor: pointer">
                <span>Twinkler</span>
            </div>
            <el-menu default-active="console"
                     router
                     class="nav-container">
                <el-menu-item index="console" :route="{name:'console'}">
                    <el-icon>
                        <Compass/>
                    </el-icon>
                    <span>首页</span>
                </el-menu-item>
                <el-menu-item index="galleries" :route="{name:'galleries'}">
                    <el-icon>
                        <PictureRounded/>
                    </el-icon>
                    <span>图库</span>
                </el-menu-item>
                <el-menu-item index="albums" :route="{name:'albums'}">
                    <el-icon>
                        <Promotion/>
                    </el-icon>
                    <span>相册</span>
                </el-menu-item>
                <el-menu-item index="member" :route="{name:'member'}">
                    <el-icon>
                        <User/>
                    </el-icon>
                    <span>个人</span>
                </el-menu-item>
                <el-menu-item index="settings" :route="{name:'settings'}">
                    <el-icon>
                        <Setting/>
                    </el-icon>
                    <span>设置</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-container style="background: #f5f6fa">
            <el-header style="background: white;height: 64px">
                <el-page-header @back="router().back()">
                    <template #content>
                        <span class="text-large font-600 mr-3"> Title </span>
                    </template>
                </el-page-header>
            </el-header>
            <el-main>
                <router-view v-slot="{ Component }">
                    <keep-alive>
                        <component :is="Component"/>
                    </keep-alive>
                </router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import router from "../router/router.js";
import {Compass, PictureRounded, Promotion, Setting, User} from "@element-plus/icons-vue";

export default {
    name: "ConsoleLayout",
    components: {Setting, User, PictureRounded, Promotion, Compass},
    data() {
        return {}
    },
    methods: {
        router() {
            return router
        },
        navigationTo(name) {
            router.push({name})
        }
    }
}
</script>

<style scoped>

.console-root {
    height: 100vh;
}

.nav-container {
    border: none;
}

.logo-side-container {
    background: deepskyblue;
    height: 64px;
    line-height: 64px;
}

.logo-side-container > span {
    color: white;
    font-weight: bold;
    font-size: 1.2rem;
    letter-spacing: 3px;
    text-align: center;
    display: block;
}
</style>