<template>
    <div class="index-layout">
        <AppBar class="appbar"/>
        <div>
            <router-view v-slot="{ Component }">
                <keep-alive>
                    <component :is="Component" />
                </keep-alive>
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

.index-layout {
    height: 100vh;
    background: rgb(20, 20, 20);
}

</style>