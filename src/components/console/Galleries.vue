<template>
    <div class="galleries-container">
        <div style="display: flex;justify-content: space-between;align-items: center">
            <el-button type="primary" :icon="Upload" @click="drawerIsOpen=true">上传</el-button>
            <el-button :icon="RefreshRight" size="large" circle/>
        </div>
        <el-divider/>
        <div class="galleries-box">
            <div v-for="(item,index) in imagesSrc" class="galleries-box-item">
                <el-image class="galleries-image"
                          fit="cover"
                          :preview-src-list="imagesUrl"
                          :src="item.links.thumbnail"
                          :initial-index="index">
                    <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"></i>
                    </div>
                </el-image>
            </div>
        </div>
        <el-divider/>
        <div style="text-align: center" v-show="isHasMore">
            <el-button @click="loadMore" :loading="isLoading">加载更多</el-button>
        </div>
        <div style="text-align: center" v-show="!isHasMore">
            <p>没有更多了！</p>
        </div>
        <el-drawer v-model="drawerIsOpen" title="Upload Images" direction="ttb">
            <SimpleUploader style="text-align: center"/>
        </el-drawer>
    </div>
</template>

<script>
import {getImageList} from "../../http/Apis.js";
import {ElMessage} from "element-plus";
import {RefreshRight, Upload} from "@element-plus/icons-vue";
import SimpleUploader from "../SimpleUploader.vue";

export default {
    name: "Galleries",
    components: {SimpleUploader},
    computed: {
        RefreshRight() {
            return RefreshRight
        },
        Upload() {
            return Upload
        }
    },
    data() {
        return {
            drawerIsOpen: false,
            imagesSrc: [],
            imagesUrl: [],
            isHasMore: true,
            isLoading: false,
            pageNumber: 1,
        }
    },
    mounted() {
        this.fetchImagesByPager(this.pageNumber)
    },
    methods: {
        /**
         * 分页加载图片
         * @param pageNumber
         */
        fetchImagesByPager(pageNumber) {
            this.isLoading = true
            getImageList(pageNumber, 5).then(r => {
                const {collection} = r
                const {last} = r
                this.isHasMore = !last
                collection.map(element => {
                    this.imagesSrc.push(element)
                    this.imagesUrl.push(element.links.url)
                })
                console.log(this.imagesUrl)
                this.isLoading = false
            }).catch(e => {
                console.log(e)
                ElMessage.error({message: e})
                this.isLoading = false
            })
        },
        loadMore() {
            if (!this.isLoading) {
                this.pageNumber++
                this.fetchImagesByPager(this.pageNumber)
            }
        }
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