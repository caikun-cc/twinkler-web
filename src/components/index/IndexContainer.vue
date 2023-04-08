<template>
    <div class="home-root">
        <p class="big-logo">Twinkler</p>
        <p class="website-description">这是你的云端相册，你可以上传图片哦!</p>
        <button class="to-upload" @click="router().push({name:'upload'})">上传</button>
    </div>
</template>

<script>
import router from "../../router/router.js";

export default {
    name: "IndexContainer",
    methods: {
        router() {
            return router
        }
    }
}
</script>

<style scoped>

.home-root {
    text-align: center;
}

.big-logo {
    color: white;
    font-size: 2.8rem;
    font-weight: bold;
    letter-spacing: 4px;
    margin-top: 160px;
}

.website-description {
    color: white;
    font-size: 1.2rem;
    font-weight: bold;
    letter-spacing: 2px;
    margin-top: 12px;
}

.to-upload {
    padding: 12px 28px;
    border-radius: 6px;
    font-size: 1.2rem;
    color: white;
    letter-spacing: 2px;
    background: none;
    border: 2px white solid;
    margin-top: 4px;
}

.to-upload:hover {
    border: 2px #f0932b solid;
    transition-duration: 0.3s;
}
</style>