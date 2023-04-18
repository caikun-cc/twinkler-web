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
    <div class="selected-images" v-show="imgDatas.length>0">
      <div class="images" v-for="item in imgDatas">

        <div style="display: flex;">
          <el-image :src="item.image" alt="" style="width: 56px;height: 56px;border-radius: 12px;"/>
          <div class="img-info">
            <p class="img-name">
              {{ item.name }}
            </p>
            <p>
            <span class="img-size">
              {{ item.size }}
            </span>
              <span class="img-status">
              {{ item.status }}
            </span>
            </p>
          </div>
        </div>

        <div class="options">
          <el-button size="large" circle>
            <el-icon size="large">
              <CloseBold/>
            </el-icon>
          </el-button>
          <el-button size="large" circle>
            <el-icon size="large">
              <UploadFilled/>
            </el-icon>
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {CloseBold, UploadFilled} from "@element-plus/icons-vue";

export default {
  name: "Uploader",
  components: {UploadFilled, CloseBold},
  computed: {},
  data() {
    return {
      imgDatas: []
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
        reader.onload = (e => {
          const name = files[i].name;
          const fileSize = files[i].size
          const urlData = e.target.result;
          this.imgDatas.push({
            image: urlData,
            name: name,
            size: parseInt(fileSize / 1024) + 'KB',
            status: '等待上传'
          })
        })

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
  cursor: pointer;
}

.selected-images {
  margin-top: 12px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  border: 2px rgba(255, 255, 255, 0.5) solid;

}

.selected-images img {
  margin-right: 10px;
}

.images {
  display: flex;
  justify-content: space-between;
}

.img-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.img-info p {
  margin: 3px 10px;
  color: rgba(255, 255, 255, 0.7);
}

.img-info p span {
  margin-right: 10px;
}

.options {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 10px;
}


</style>