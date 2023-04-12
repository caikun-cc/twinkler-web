<template>
    <div class="index-root">
        <AppBar class="appbar"/>
        <div class="index-container">
<!--            <router-view v-slot="{ Component }">-->
<!--                <transition name="el-fade-in-linear">-->
<!--                    <component :is="Component"/>-->
<!--                </transition>-->
<!--            </router-view>-->
            <router-view v-slot="{ Component }">
                <transition name="fade">
                    <component :is="Component" />
                </transition>
            </router-view>
        </div>
    </div>
</template>

<script>

import AppBar from "../components/AppBar.vue";

export default {
    name: "IndexLayout",
    components: {AppBar},
}
</script>

<style scoped>

.index-root {
    height: 100vh;
    background: rgb(24, 24, 24);
}

.index-container {
    width: 100%;
}
</style>