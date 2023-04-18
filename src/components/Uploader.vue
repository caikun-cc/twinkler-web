<template>
    <div class="upload-root">
        <p>Image Upload</p>
        <el-card class="upload-container" @click="choose">
            <input v-show="false"
                   ref="choiceInput"
                   type="file"
                   :multiple="true"
                   id="open-choice"
                   @change="choiceChanged($event)">
            <img src="../assets/icon-upload.png" alt="" class="upload-icon" style="width: 56px;height: 56px">
        </el-card>
        <div class="selected-images" v-show="images.length>0">
            <div v-for="item in images">
                <img :src="item" alt="" style="width: 56px;height: 56px">
            </div>
        </div>
    </div>
</template>

<script>
import {Plus} from "@element-plus/icons-vue";

export default {
    name: "Uploader",
    components: {Plus},
    data() {
        return {
            images: []
        }
    },
    methods: {
        choose() {
            this.$refs.choiceInput.dispatchEvent(new MouseEvent('click'))
        },
        choiceChanged(event) {
            const files = event.target.files
            console.log(files)
            for (let i = 0; i < files.length; i++) {
                const reader = new FileReader();
                reader.readAsDataURL(files[i]);
                reader.onload = function (e) {
                    const urlData = this.result;
                    this.images.push(urlData)
                };
            }
        },
    }
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
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
}

.selected-images {
    margin-top: 12px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.1);
    border: 2px rgba(255, 255, 255, 0.5) solid;
}
</style>