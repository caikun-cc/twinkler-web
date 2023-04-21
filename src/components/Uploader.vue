<template>
    <div class="upload-root">
        <p>Image Upload</p>
        <p style="font-size: 10px">最大允许上传20MB图片，本站以托管 {{ count }} 张图片！</p>
        <el-card class="upload-container" @click="choose">
            <input :multiple="true"
                   v-show="false"
                   ref="choiceInput"
                   type="file"
                   id="open-choice"
                   accept="image/*"
                   @change="choiceChanged($event)">
            <img src="../assets/icon-upload.png" alt="" class="upload-icon" style="width: 56px;height: 56px">
        </el-card>
        <div class="selected-container" v-show="selectedImages.length > 0">
            <div v-for="(item,index) in selectedImages" :key="index">
                <div class="selected-image-box">
                    <div class="progress">
                        <div :style="{ width: item.progress + '%'}"></div>
                    </div>
                    <div style="display: flex;width: max-content;">
                        <el-image :src="item.src" fit="cover" style="width: 56px;height: 56px;border-radius: 12px;"/>
                        <div class="image-info-box">
                            <p class="image-name">{{ item.name }}</p>
                            <p class="image-info">{{ item.size }}&nbsp;&nbsp;&nbsp;{{ item.status }}</p>
                        </div>
                    </div>
                    <div class="selected-actions-box">
                        <el-button size="large" :icon="CloseBold" circle @click="remove(index)"/>
                        <el-button :icon="UploadFilled"
                                   size="large"
                                   circle
                                   @click="imageUpload(index)"
                                   v-if="item.status"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="links-container">
            <div id="link-tables">
                <el-tabs v-model="link" @tab-click="handleClick">
                    <div>
                        <el-tab-pane label="URL" name="url">{{ url }}</el-tab-pane>
                        <el-tab-pane label="HTML" name="html">{{ HTML }}</el-tab-pane>
                        <el-tab-pane label="Markdown" name="md">{{ Markdown }}</el-tab-pane>
                    </div>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>

import {CloseBold, UploadFilled} from "@element-plus/icons-vue";
import {getImageCount, upload} from "../http/Apis.js";
import {ElMessage, ElNotification} from "element-plus";

export default {
    name: "Uploader",
    computed: {
        UploadFilled() {
            return UploadFilled
        },
        CloseBold() {
            return CloseBold
        }
    },
    components: {UploadFilled, CloseBold},
    data() {
        return {
            selectedImages: [],
            count: 0,
            link: null,
        }
    },
    mounted() {
        getImageCount().then(r => {
            this.count = r
        })
    },
    methods: {
        choose() {
            this.$refs.choiceInput.dispatchEvent(new MouseEvent('click'))
        },
        choiceChanged(event) {
            const files = event.target.files;
            for (let i = 0; i < files.length; i++) {
                const f = files[i]
                const src = window.URL.createObjectURL(f)
                this.selectedImages.push({
                    progress: 0,
                    src: src,
                    image: f,
                    name: f.name,
                    size: parseInt(f.size / 1000) + "kb",
                    status: '等待上传',
                })
            }
        },
        remove(index) {
            this.selectedImages.splice(index, 1)
            console.log(this.selectedImages)
        },
        imageUpload(index) {
            this.selectedImages[index].status = '正在上传';
            const image = this.selectedImages[index].image;
            upload(image, progressEvent => {
                this.selectedImages[index].progress = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                );
            }).then(r => {
                this.selectedImages[index].status = '上传成功';
                ElNotification.success({message: r.links.url})
            }).catch(e => {
                this.selectedImages[index].status = '上传失败';
                ElMessage.error({message: e})
            })
        },
        handleClick(tab, event) {
            console.log(tab, event);
        }
    }
}
</script>

<style scoped>
.upload-root {
    margin: auto;
    width: 1000px;
    padding-top: 20px;
}

.upload-root > p {
    color: rgba(255, 255, 255, 0.7);
    letter-spacing: 3px;
    font-size: 1.4rem;
    margin: 12px 2px;
}

.upload-container {
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.1);
    border: 2px rgba(255, 255, 255, 0.5) solid;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    cursor: pointer;
}

.selected-container {
    margin-top: 12px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.1);
    border: 2px rgba(255, 255, 255, 0.5) solid;
}

.selected-image-box {
    display: flex;
    justify-content: space-between;
    margin: 4px;
    position: relative;
    overflow: hidden;
}

.progress {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}

.progress div {
    height: 100%;
    background-color: rgba(255, 255, 255, 0.2);
    transition: width 0.5s ease-in-out;
    border-radius: 12px;
}

.image-info-box {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    color: whitesmoke;
    font-size: 14px;
    margin-left: 12px;
    padding: 2px;
}

.image-info-box > p {
    margin: 0;
}

.selected-actions-box {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 10px;
}

.links-container {
    margin-top: 10px;
    background: white;
    padding: 0 20px 15px 20px;
    border-radius: 5px;
}

</style>