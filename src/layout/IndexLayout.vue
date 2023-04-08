<template>
    <div class="index-root">
        <AppBar class="appbar"/>
        <div class="index-container">
            <transition name="el-fade-in-linear">
                <router-view/>
            </transition>
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
    background: rgb(24,24,24);
}

.index-container {
    width: 100%;
}
</style>