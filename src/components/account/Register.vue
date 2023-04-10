<template>
  <el-card style="padding: 0 24px">
    <p class="login-text">注册</p>
    <el-form size="large">
      <el-form-item>
        <el-input placeholder="输入昵称"/>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="输入邮箱"/>
      </el-form-item>
      <el-form-item>
        <el-row style="width: 100%;justify-content: space-between">
          <el-col :span="16">
            <el-input placeholder="输入验证码"/>
          </el-col>
          <el-col :span="7">
            <el-button style="display: block;width: 100%">发送</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="输入密码"/>
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

export default {
  name: "Register",
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
  margin-bottom: 20px;
}

.bottom-container > p {
  color: #606266;
}

</style>