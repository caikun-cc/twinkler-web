<template>
    <div class="galleries-container">
        <div>
            <el-button type="primary" :icon="Upload" @click="drawerIsOpen=true">上传</el-button>
        </div>
        <el-divider/>
        <div class="galleries-box">
            <div v-for="(item,index) in imagesSrc" class="galleries-box-item">
                <el-image class="galleries-image"
                          fit="cover"
                          lazy
                          :preview-src-list="imagesUrl"
                          :src="item.links.url"
                          :initial-index="index"/>
                <div class="galleries-image-options"></div>
            </div>
        </div>
        <el-drawer v-model="drawerIsOpen" title="Upload Images" direction="ttb">
            <SimpleUploader style="text-align: center"/>
        </el-drawer>
    </div>
</template>

<script>
import {getImageList} from "../../http/Apis.js";
import {ElMessage} from "element-plus";
import {Upload} from "@element-plus/icons-vue";
import SimpleUploader from "../SimpleUploader.vue";

export default {
    name: "Galleries",
    components: {SimpleUploader},
    computed: {
        Upload() {
            return Upload
        }
    },
    data() {
        return {
            drawerIsOpen: false,
            imagesSrc: [],
            imagesUrl: [],
        }
    },
    mounted() {
        getImageList(1, 30).then(r => {
            const {collection} = r
            this.imagesSrc = collection
            collection.map(element => {
                this.imagesUrl.push(element.links.url)
            })
            console.log(this.imagesUrl)
        }).catch(e => {
            console.log(e)
            ElMessage.error({message: e})
        })
    }
}
</script>

<style scoped>
.galleries-container {

}

.galleries-box {
    display: flex;
    flex-wrap: wrap;
}

.galleries-box-item {
    margin: 8px;
}

.galleries-image {
    width: 200px;
    height: 200px;
    border-radius: 5px;
    background: white;
}
</style>