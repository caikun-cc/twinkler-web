<template>
  <el-card style="padding: 0 24px">
    <p class="login-text">注册</p>
    <el-form size="large">
      <el-form-item>
        <el-input v-model="User.nick" placeholder="输入昵称"/>
      </el-form-item>
      <el-form-item>
        <el-input v-model="User.email" placeholder="输入邮箱"/>
      </el-form-item>
      <el-form-item>
        <el-row style="width: 100%;justify-content: space-between">
          <el-col :span="16">
            <el-input v-model="User.verifyCode" placeholder="输入验证码"/>
          </el-col>
          <el-col :span="7">
            <el-button style="display: block;width: 100%" @click="send()" :disabled="buttonStatus.disabled">{{
                buttonStatus.text
              }}
            </el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-input v-model="User.password" placeholder="输入密码"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 100%">注册</el-button>
      </el-form-item>
    </el-form>
    <div class="bottom-container">
      <p @click="router().push({name:'login'})">已有账号，去<span
          style="color: cornflowerblue;cursor:pointer;">登录</span></p>
    </div>
  </el-card>
</template>

<script>

import router from "../../router/router.js";
import {ElNotification} from 'element-plus'
import {sendEmail} from "../../http/apis";

export default {
  name: "Register",
  data() {
    return {
      User: {
        nick: '',
        email: '',
        verifyCode: '',
        password: '',
      },
      buttonStatus: {
        disabled: false, // 按钮是否可用
        countDown: 60,
        text: '发送'
      }
    }
  },
  methods: {
    router() {
      return router
    },
    send() {
      if (this.verifyNick() && this.verifyEmail()) {
        this.buttonSleep()
        sendEmail(this.User.email).then(r => {
          if (r.status) {
            ElNotification({message: '邮件发送成功', title: 'Success', type: 'success'})
          } else {
            ElNotification({message: '邮件发送异常', title: 'Error', type: 'error'})
          }
        }).catch(e => {
          ElNotification({message: e.message, title: 'Error', type: 'error'})
        })

      }
    },
    verifyNick() {
      var special = new RegExp(/[^a-zA-Z0-9]/);
      if (this.User.nick.length < 6 || this.User.nick.length >= 18) {
        ElNotification({message: '昵称长度为6-18位', title: 'Error', type: 'error',})
      } else if (special.test(this.User.nick)) {
        ElNotification({message: '昵称不得包含特殊字符', title: 'Error', type: 'error',})
      } else {
        return true
      }
    },
    verifyEmail() {
      var email_Regex = new RegExp('^.+@[A-Z0-9a-z]+\.[a-zA-Z]+$');
      if (!email_Regex.test(this.User.email)) {
        ElNotification({message: '邮箱不合法', title: 'Error', type: 'error',})
      } else {
        return true
      }
    },
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
  margin-bottom: 20px;
}

.bottom-container > p {
  color: #606266;
}

</style>