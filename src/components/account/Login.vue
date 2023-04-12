<template>
    <el-card id="login-root">
        <p class="login-text">登录</p>
        <el-form size="large">
            <el-form-item>
                <el-input clearable placeholder="邮箱" v-model="email"/>
            </el-form-item>
            <el-form-item>
                <el-input type="password" show-password clearable placeholder="密码" v-model="password"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="width: 100%" @click="submit()">登录</el-button>
            </el-form-item>
        </el-form>
        <div class="bottom-container">
            <p @click="router().push({name:'register'})">注册账号</p>
            <p>忘记密码</p>
        </div>
        <el-button @click="test()">测试</el-button>
    </el-card>
</template>

<script>

import router from "../../router/router.js";
import jwtSubject from "../../utils/JwtSubject.js";
import {ElMessage, ElNotification} from "element-plus";
import {login, userDetails} from "../../http/Apis.js";

export default {
    name: "Login",
    data() {
        return {
            email: null,
            password: null
        }
    },
    methods: {
        router() {
            return router
        },
        submit() {
            if (this.email.trim().length > 0 && this.password.trim().length > 0) {
                login(this.email, this.password).then(r => {
                    jwtSubject.save(r)
                    ElNotification.success({message: "登录成功"})
                }).catch(e => {
                    console.log("failure: ")
                    console.log(e)
                    ElMessage.error({message: "登录失败：" + e})
                })
            } else {
                ElMessage.error({message: "请输入信息"})
            }
        },
        test() {
            let token = jwtSubject.obtainDetails()
            // console.log(token)
            // console.log(jwtSubject.isAvailable())
            const {accessToken} = token
            userDetails(accessToken.token).then(r => {
                ElNotification.success({message: r})
                console.log(r)
            }).catch(e => {
                ElMessage.error({message: e})
            })
        }
    }
}
</script>

<style scoped>
#login-root {
    width: 420px;
    padding: 0 24px
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