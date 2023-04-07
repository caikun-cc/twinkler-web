<template>
    <div class="index-root">
        <AppBar class="appbar"/>
        <div class="index-container">
            <router-view/>
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
    background-image: url("https://pic.imgdb.cn/item/642fd4e0a682492fcc5b9e38.png");
}

.index-container {
    width: 100%;
}
</style>