<template>
    <el-card style="padding: 0 24px">
        <p class="login-text">登录</p>
        <el-form size="large">
            <el-form-item>
                <el-input/>
            </el-form-item>
            <el-form-item>
                <el-input/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="width: 100%">登录</el-button>
            </el-form-item>
        </el-form>
        <div class="bottom-container">
            <p @click="router().push({name:'register'})">注册账号</p>
            <p>忘记密码</p>
        </div>
    </el-card>
</template>

<script>

import router from "../../router/router.js";

export default {
    name: "Login",
    data() {
        return {}
    },
    methods: {
        router() {
            return router
        }
    }
}
</script>

<style scoped>
.el-card {
    width: 420px;
}

.login-text {
    text-align: center;
    font-size: 2rem;
    letter-spacing: 5px;
}

.bottom-container {
    display: flex;
    padding: 0 3px;
    justify-content: space-between;
    margin-bottom: 12px;
    cursor: pointer;
}

.bottom-container > p {
    color: #606266;
}

.bottom-container > p:hover {
    color: #e6a23c;
    transition-duration: 0.5s;
}
</style>