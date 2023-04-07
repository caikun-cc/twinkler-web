<template>
    <el-button @click="router().push({name:'login'})">button</el-button>
</template>

<script>
import router from "../router/router.js";

export default {
    name: "IndexLayout",
    methods: {
        router() {
            return router
        }
    }
}
</script>

<style scoped>

</style>