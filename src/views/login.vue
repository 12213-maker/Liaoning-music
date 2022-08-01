<template>
  <div class="login">
    <div class="login-main">
      <div class="login_main_left">
        <div class="main_left">
          <div class="title">辽宁大音平台</div>
          <div class="desc">数智辽宁·AI赋能</div>
          <el-carousel
            height="335px"
            style="width: 472px"
            indicator-position="outside"
            arrow="never"
          >
            <el-carousel-item v-for="(item, idx) in carImgs" :key="idx">
              <img :src="item.url" alt />
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <div class="login_box">
        <div class="title">
          <span>欢迎登录</span>
        </div>
        <!-- 登录表单区域 -->
        <el-form
          label-width="0px"
          :model="loginForm"
          :rules="loginRules"
          ref="loginForm"
          class="login_form"
        >
          <!-- 用户名 -->
          <el-form-item prop="username">
            <el-input
              class="ipt"
              clearable
              prefix-icon="el-icon-user-solid"
              v-model="loginForm.username"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password">
            <el-input
              class="ipt"
              clearable
              prefix-icon="el-icon-lock"
              type="password"
              v-model="loginForm.password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <!-- 验证码 -->
          <!-- <el-form-item prop="code">
            <el-row>
              <el-col :span="12">
                <el-input
                  clearable
                  v-model="loginForm.code"
                  auto-complete="off"
                  placeholder="验证码"
                  style="width: 120px !important"
                >
                </el-input>
              </el-col>

              <el-col :span="11" :offset="1" class="imgCode">
                <img class="pointer" :src="codeUrl" @click="getCode" />
              </el-col>
            </el-row>
          </el-form-item> -->

          <!-- 记住用户名 -->
          <el-checkbox v-model="loginForm.rememberMe">记住用户名密码</el-checkbox>
          <!-- 按钮区域 -->
          <el-form-item>
            <el-button
              :loading="loading"
              size="medium"
              type="primary"
              style="width:100%;"
              @click.native.prevent="handleLogin"
            >
              <span v-if="!loading">登 录</span>
              <span v-else>登 录 中...</span>
            </el-button>
            <!-- <el-button type="info" @click="restLoginForm">重置</el-button> -->
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
  <!-- <div class="login">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
      <h3 class="title">辽宁大音平台</h3>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号">
          <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          auto-complete="off"
          placeholder="密码"
          @keyup.enter.native="handleLogin"
        >
          <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          v-model="loginForm.code"
          auto-complete="off"
          placeholder="验证码"
          style="width: 63%"
          @keyup.enter.native="handleLogin"
        >
          <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />
        </el-input>
        <div class="login-code">
          <img :src="codeUrl" @click="getCode" class="login-code-img"/>
        </div>
      </el-form-item>
      <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button
          :loading="loading"
          size="medium"
          type="primary"
          style="width:100%;"
          @click.native.prevent="handleLogin"
        >
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
    </el-form>
    <div class="el-login-footer">
      <span>Copyright © 2021-2030 Asiainfo@CMC-SRD-BD All Rights Reserved.</span>
    </div>
  </div> -->
</template>

<script>
  import {getCodeImg} from "@/api/login";
  import sessionStorage from "js-cookie";
  import {decrypt, encrypt} from '@/utils/jsencrypt'
  import { getUserInfo } from '@/api/stationstore/api'

  export default {
  name: "Login",
  data() {
    return {
      codeUrl: "",
      cookiePassword: "",
      loginForm: {
        username: "",
        password: "admi23",
        rememberMe: false,
        code: "",
        uuid: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "用户名不能为空" }
        ],
        password: [
          { required: true, trigger: "blur", message: "密码不能为空" }
        ],
        code: [{ required: false, trigger: "change", message: "验证码不能为空" }]
      },
      loading: false,
      redirect: undefined,

      carImgs: [
        { url: require("@/assets/images/login/1.png") },
        { url: require("@/assets/images/login/2.png") },
        { url: require("@/assets/images/login/3.png") },
        { url: require("@/assets/images/login/4.png") },
      ],
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  created() {
    this.getCode();
    this.getCookie();
  },
  methods: {
    getCode() {
      getCodeImg().then(res => {
        console.log(111111);
        this.codeUrl = "data:image/gif;base64," + res.img;
        this.loginForm.uuid = res.uuid;
      });
    },
    getCookie() {
      const username = sessionStorage.get("username");
      const password = sessionStorage.get("password");
      const rememberMe = sessionStorage.get('rememberMe')
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password: password === undefined ? this.loginForm.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
      };
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          if (this.loginForm.rememberMe) {
            sessionStorage.set("username", this.loginForm.username, { expires: 30 });
            sessionStorage.set("password", encrypt(this.loginForm.password), { expires: 30 });
            sessionStorage.set('rememberMe', this.loginForm.rememberMe, { expires: 30 });
          } else {
            sessionStorage.remove("username");
            sessionStorage.remove("password");
            sessionStorage.remove('rememberMe');
          }
          this.loginForm.password = this.loginForm.password.trim();
          this.loginForm.username = this.loginForm.username.trim(); 
          this.$store
            .dispatch("Login", this.loginForm)
            .then((res) => {
              getUserInfo().then(res => {
                const obj = res.data || {}
                if(obj.provinceCity =='本部'){
                  obj.provinceCity = '辽宁省'
                }
                window.sessionStorage.setItem("dept",JSON.stringify(obj))
              })
              this.$router.push({ path: "/redirect" })
            })
            .catch(() => {
              this.loading = false;
              this.getCode();
            });
        }
      });
    }
  }
};
</script>

<style lang="scss">
.login {
  background: rgb(219, 231, 238);
  height: 100%;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-main {
    width: 960px;
    // margin: auto;
    display: flex;
    height: 496px;
    .login_main_left {
      width: 632px;
      height: 100%;
      background: #f5fafe;
      border-top-left-radius: 16px;
      border-bottom-left-radius: 16px;
      .main_left {
        margin: 35px 80px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .title {
          font-size: 26px;
          font-weight: 600;
          color: #435e9a;
          margin-bottom: 12px;
        }
        .desc {
          font-size: 16px;
          font-weight: 400;
          color: #8294be;
          margin-bottom: 15px;
        }
      }
    }

    .login_box {
      width: 328px;
      padding: 10px 40px 25px 40px;
      box-sizing: border-box;
      background-color: #fff;
      height: 100%;
      border-top-right-radius: 16px;
      border-bottom-right-radius: 16px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .title {
        text-align: left;
        margin-bottom: 35px;
        width: 100%;
        & > span {
          font-size: 16px;
          font-weight: 400;
          color: #000000;
          display: inline-block;
          padding-bottom: 5px;
          border-bottom: 5px solid #0a6bef;
        }
      }
      .login_form {
        width: 100%;
        box-sizing: border-box;
        .el-form-item {
          margin-bottom: 30px;
          .el-button {
            width: 100%;
          }
        }
        .imgCode {
          display: flex;
          align-items: center;
          height: 40px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .el-checkbox {
          margin-bottom: 35px;
          color: #a3a8b2;
        }
      }

      .save-login {
        cursor: pointer;
        height: 32px;
        background: #65a3fa;
        color: #fff;
        border-radius: 16px;
        width: 100%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        outline:0px;
        border:0px;
        &:hover {
          background: #3f8dfc;
        }
      }
    }
  }
}
v-deep .ipt.el-input .el-input__inner {
  padding-left: 30px;
}
</style>
