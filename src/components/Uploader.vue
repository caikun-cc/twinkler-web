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
      <div class="selected-image-box" v-for="(item,index) in selectedImages">
        <div style="display: flex">
          <el-image :src="item.image" alt="" style="width: 56px;height: 56px;border-radius: 12px;"/>
          <div class="image-info-box">
            <p class="image-name">{{ item.name }}</p>
            <p class="image-info">{{ item.size }} {{ item.status }}</p>
          </div>
        </div>
        <div class="selected-actions-box">
          <el-button size="large" :icon="CloseBold" circle @click="remove(index)"/>
          <el-button size="large" :icon="UploadFilled" circle @click="imageUpload(index)"/>
        </div>
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
      files: [],
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
      this.files.push(files);
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader()
        const f = files[i]
        const src = window.URL.createObjectURL(f)
        reader.readAsDataURL(f)
        reader.onload = (element => {
          this.selectedImages.push({
            src: src,
            image: element.target.result,
            name: f.name,
            size: parseInt(f.size / 1000) + "kb",
            status: '等待上传',
            index: i
          })
        })
      }
      console.log(this.selectedImages)
    },
    remove(index) {
      this.selectedImages.splice(index, 1)
      console.log(this.selectedImages)
    },
    imageUpload(index) {
      const image = this.files[index][0];
      upload(image).then(r => {
        ElNotification.success({message: r.links.url})
      }).catch(e => {
        ElMessage.error({message: e})
      })
    }
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
  padding: 3px;
}

.selected-image-box {
  display: flex;
  justify-content: space-between;
  padding: 3px;
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
</style>