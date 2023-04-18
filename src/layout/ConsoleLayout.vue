<template>
    <el-container style="height: 100vh;">
        <el-aside width="240px">
            <div class="logo-side-container"
                 @click="navigationTo('index')"
                 style="cursor: pointer">
                <span>Twinkler</span>
            </div>
            <el-menu default-active="console"
                     router
                     style="border: none">
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

.logo-side-container {
    background: deepskyblue;
    height: 64px;
    line-height: 64px;
}

.logo-side-container > span {
    color: white;
    font-weight: bold;
    font-size: 1.2rem;
    display: block;
    text-align: center;
    letter-spacing: 3px;
}
</style>