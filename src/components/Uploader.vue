<template>
    <div class="upload-root">
        <p>Image Upload</p>
        <el-card class="upload-container">

        </el-card>
    </div>
</template>

<script>
export default {
    name: "Uploader"
}
</script>

<style scoped>
.upload-root {
    margin: auto;
    width: 1000px;
    padding-top: 56px;
}

.upload-root > p {
    color: rgba(255, 255, 255, 0.7);
    letter-spacing: 3px;
    font-size: 1.2rem;
}

.upload-container {
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.1);
    border: 2px rgba(255, 255, 255, 0.5) solid;
    height: 200px;
}
</style>