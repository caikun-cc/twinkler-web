<template>
    <div class="upload-root">
        <p>Image Upload</p>
        <el-card class="upload-container">
            <el-upload
                    class="avatar-uploader"
                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                    :show-file-list="false">
                <img v-if="false" class="avatar" alt="" src=""/>
                <el-icon v-else class="avatar-uploader-icon">
                    <Plus/>
                </el-icon>
            </el-upload>
        </el-card>
    </div>
</template>

<script>
import {Plus} from "@element-plus/icons-vue";

export default {
    name: "Uploader",
    components: {Plus}
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