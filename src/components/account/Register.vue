<template>
    <el-card id="register-root">
        <p class="login-text">注册</p>
        <el-form size="large">
            <el-form-item>
                <el-input clearable v-model="user.nick" placeholder="昵称"/>
            </el-form-item>
            <el-form-item>
                <el-input clearable v-model="user.email" placeholder="邮箱"/>
            </el-form-item>
            <el-form-item>
                <el-row style="width: 100%">
                    <el-col :span="18">
                        <el-input clearable v-model="user.code" placeholder="验证码"/>
                    </el-col>
                    <el-col :span="6" id="send-code-box">
                        <el-button
                                type="primary"
                                plain
                                @click="sendVerificationCode()"
                                :disabled="buttonStatus.disabled"
                                style="width: 90%">
                            {{ buttonStatus.text }}
                        </el-button>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item>
                <el-input
                        v-model="user.password"
                        type="password"
                        show-password
                        clearable
                        placeholder="密码"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="width: 100%">注册</el-button>
            </el-form-item>
        </el-form>
        <div class="bottom-container">
            <p @click="router().push({name:'login'})">已有账号，去
                <span style="color: cornflowerblue;cursor:pointer;">登录</span>
            </p>
        </div>
    </el-card>
</template>

<script>

import router from "../../router/router.js";
import {ElMessage} from 'element-plus'
import {sendEmailVerificationCode} from "../../http/Apis.js";

export default {
    name: "Register",
    data() {
        return {
            user: {
                email: null,
                password: null,
                nick: null,
                code: null,
            },
            //发送验证码按钮状态
            buttonStatus: {
                text: '发送',
                countDown: 60,
                disabled: false,
            }
        }
    },
    methods: {
        router() {
            return router
        },
        sendVerificationCode() {
            if (this.verifyNick() && this.verifyEmail()) {
                this.buttonSleep()
                sendEmailVerificationCode(this.user.email).then(r => {
                    if (r.status) {
                        ElMessage({message: '邮件发送成功', title: 'Success', type: 'success'})
                    } else {
                        ElMessage({message: '邮件发送异常', title: 'Error', type: 'error'})
                    }
                }).catch(e => {
                    ElMessage({message: e.message, title: 'Error', type: 'error'})
                })
            }
        },
        verifyNick() {
            const special = new RegExp(/[^a-zA-Z0-9]/);
            if (this.user.nick.length < 6 || this.user.nick.length >= 18) {
                ElMessage.error({message: "昵称长度为6-18位"})
            } else if (special.test(this.user.nick)) {
                ElMessage.error({message: "昵称不得包含特殊字符"})
            } else {
                return true
            }
        },
        verifyEmail() {
            const isEmail = new RegExp('^.+@[A-Z0-9a-z]+\.[a-zA-Z]+$');
            if (!isEmail.test(this.user.email)) {
                ElMessage.error({message: "邮箱不合法"})
            } else {
                return true
            }
        },

        /**
         * 按钮休眠，点击发送验证码需60秒后才能再次发送
         */
        buttonSleep() {
            this.buttonStatus.disabled = true;
            let timer = setInterval(() => {
                if (this.buttonStatus.countDown > 0) {
                    this.buttonStatus.countDown--;
                    this.buttonStatus.text = this.buttonStatus.countDown + '秒后重发'
                } else {
                    clearInterval(timer);
                    this.buttonStatus.disabled = false;
                    this.buttonStatus.countDown = 60;
                    this.buttonStatus.text = '发送'
                }
            }, 1000);
        },
    }
}
</script>

<style scoped>
#register-root {
    width: 420px;
    padding: 0 24px
}

.login-text {
    text-align: center;
    font-size: 2rem;
    letter-spacing: 5px;
}

#send-code-box {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    align-items: center;
}

.bottom-container {
    display: flex;
    padding: 0 3px;
    justify-content: space-between;
    margin-bottom: 24px;
}

.bottom-container > p {
    color: #606266;
}

</style>