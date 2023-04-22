<template>
    <div class="console-bar-root">
        <div class="console-bar-box-l">
            <el-page-header @back="goBack">
                <template #content>
                    <span class="text-large font-600 mr-3"> {{ title }} </span>
                </template>
            </el-page-header>
        </div>
        <div class="console-bar-box-r">
            <el-avatar :src="avatar"></el-avatar>
        </div>
    </div>
</template>

<script>
import {Back} from "@element-plus/icons-vue";
import router from "../router/router.js";

export default {
    name: "ConsoleHeaderBar",
    computed: {
        Back() {
            return Back
        }
    },
    props: {
        title: String,
        id: Number,
        avatar: String
    },
    data() {
        return {}
    },
    methods: {
        goBack() {
            router.back()
        }
    }
}
</script>

<style scoped>
.console-bar-root {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.console-bar-box-l {
    display: flex;
    align-items: center;
}

.console-bar-box-r {

}
</style>