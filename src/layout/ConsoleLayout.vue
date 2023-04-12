<template>
    <el-container class="console-root">
        <el-aside width="240px">
            <div class="logo-side-container"
                 @click="navigationTo('index')"
                 style="cursor: pointer">
                <span>Twinkler</span>
            </div>
            <el-menu style="border: none;"
                     active-text-color="#fa983a"
                     default-active="console">
                <el-menu-item index="console">
                    <el-icon>
                        <Compass/>
                    </el-icon>
                    <span>首页</span>
                </el-menu-item>
                <el-menu-item index="gallery">
                    <el-icon>
                        <PictureRounded/>
                    </el-icon>
                    <span>图库</span>
                </el-menu-item>
                <el-menu-item index="albums">
                    <el-icon>
                        <Promotion/>
                    </el-icon>
                    <span>相册</span>
                </el-menu-item>
                <el-menu-item index="user">
                    <el-icon>
                        <User/>
                    </el-icon>
                    <span>个人</span>
                </el-menu-item>
                <el-menu-item index="settings">
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
                    <transition name="el-zoom-in-center">
                        <component :is="Component"/>
                    </transition>
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
    methods: {
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

.el-menu-item:hover {
    background: #f7f1e3;
}

.logo-side-container {
    background: #ff793f;
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