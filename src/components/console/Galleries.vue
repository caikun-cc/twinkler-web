<template>
    <div class="galleries-container">
        <div v-for="(item,index) in imagesSrc" class="galleries-item-box">
            <el-image class="galleries-image"
                      lazy
                      fit="cover"
                      :preview-src-list="imagesUrl"
                      :src="item.links.url"
                      :initial-index="index">
                <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                </div>
            </el-image>
        </div>
    </div>
</template>

<script>
import {getImageList} from "../../http/Apis.js";
import {ElMessage} from "element-plus";

export default {
    name: "Galleries",
    data() {
        return {
            imagesSrc: [],
            imagesUrl: []
        }
    },
    mounted() {
        getImageList(1, 30).then(r => {
            const {collection} = r
            this.imagesSrc = collection
            collection.map((e, i) => {
                this.imagesUrl.push(e.links.url)
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
    display: flex;
    flex-wrap: wrap;
}

.galleries-item-box {
    margin: 8px;
}

.galleries-image {
    width: 200px;
    height: 200px;
    border-radius: 5px;
    box-shadow: -2px 2px 30px 1px rgba(0, 0, 0, 0.2);
    background: white;
}
</style>