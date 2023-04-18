<template>
    <div class="console-bar-root">
        <div class="console-bar-left-box">
            <el-page-header @back="goBack">
                <template #content>
                    <span class="text-large font-600 mr-3"> Title </span>
                </template>
            </el-page-header>
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
        title: String
    },
    data() {
        return {}
    },
    methods: {
        goBack(){
            router.back()
        }
    }
}
</script>

<style scoped>
.console-bar-root {
    height: 100%;
    display: flex;
}

.console-bar-left-box {
    display: flex;
    align-items: center;
}
</style>