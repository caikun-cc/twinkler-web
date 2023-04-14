<template>
    <el-card id="login-root">
        <p class="login-text-tip">登录</p>
        <el-form size="large">
            <el-form-item>
                <el-input clearable placeholder="邮箱" v-model="email"/>
            </el-form-item>
            <el-form-item>
                <el-input type="password" show-password clearable placeholder="密码" v-model="password"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :loading="isSubmitting" style="width: 100%" @click="submit()">登录</el-button>
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
import jwtSubject from "../../utils/JwtSubject.js";
import {ElMessage, ElNotification} from "element-plus";
import {login} from "../../http/Apis.js";

export default {
    name: "Login",
    data() {
        return {
            isSubmitting: false,
            email: null,
            password: null,
        }
    },
    methods: {
        router() {
            return router
        },
        submit() {
            if (this.email.trim().length > 0 && this.password.trim().length > 0) {
                this.isSubmitting = true
                login(this.email, this.password).then(r => {
                    jwtSubject.save(r)
                    this.isSubmitting = false
                    ElNotification.success({message: "登录成功"})
                    router.push({name: "index"})
                }).catch(e => {
                    ElMessage.error({message: "登录失败：" + e})
                    this.isSubmitting = false
                })
            } else {
                ElMessage.error({message: "请输入信息"})
            }
        },
    }
}
</script>

<style scoped>
#login-root {
    width: 420px;
    padding: 0 24px
}

.login-text-tip {
    text-align: center;
    font-size: 2rem;
    letter-spacing: 5px;
}

.bottom-container {
    display: flex;
    padding: 0 3px;
    justify-content: space-between;
    margin-bottom: 24px;
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