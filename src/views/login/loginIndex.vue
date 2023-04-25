<template>
  <div id="login">
    <div id="contain">
      <div id="left_card">
        <h1>Welcome</h1>
      </div>
      <div id="right_card">
        <el-card class="el-card">
          <h2>欢迎登录</h2>
          <el-form class="login">
            <el-input
              v-model="userLoginForm.username"
              placeholder="请输入账号"
            />
            <el-input
              type="password"
              v-model="userLoginForm.password"
              placeholder="请输入密码"
              @keyup.enter="signIn"
            />
          </el-form>
          <el-checkbox
            v-model="userLoginForm.isRemember"
            :true-label="1"
            :false-label="0"
            size="large"
            >记住密码</el-checkbox
          >
          <div id="btn">
            <el-button class="loginbtn" @click="signIn">登陆</el-button>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { getCurrentInstance, reactive, ref } from 'vue';
import { login } from '@/api/login';
const router = useRouter();

let userLoginForm = reactive({
  username: '',
  password: '',
  isRemember: 0,
});

//获取用户登录信息
function signIn() {
  login({
    userName: userLoginForm.username,
    password: userLoginForm.password,
  }).then((res) => {
    if(res.code === 0 ){
      router.push('/home');
    }
  });
}
//获取用户信息
function getUserInfo() {
  console.log(2);
}
</script>
<style lang="scss" scoped>
@keyframes animate {
  0% {
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(360deg);
  }
}
#login {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-image: url(../../assets/cat&fish.webp);
  background-size: 100% 100%;
  background-color: #a7a8bd;
  #contain {
    height: 400px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 25px;
    border: 1px solid rgba(146, 145, 145, 0.2);
    background-color: rgba(255, 255, 255, 0.1) !important;
    backdrop-filter: blur(5px);
    box-shadow: -5px -5px 10px rgb(39, 65, 65), 5px 5px 20px aqua;
    /* 5秒 infinite循环播放无限次 linear匀速  */
    animation: animate 5s linear infinite;
  }
}
#contain {
  display: flex;
  flex-direction: row;
  text-align: center;
  align-items: center;
  #left_card {
    width: 500px;
    h1 {
      color: white;
      white-space: nowrap;
    }
    span {
      font-size: 1.2rem;
      text-align: center;
      color: white;
      white-space: nowrap;
    }
  }
  #right_card {
    width: 400px;
    .el-card {
      margin: 0 45px;
      border-radius: 25px;
      background-color: rgba(255, 255, 255, 0.1);
      .el-checkbox {
        color: #333;
      }
    }
  }
}
#right_card {
  display: flex;
  justify-content: center;
  align-items: center;
  h2 {
    margin-bottom: 5px;
  }
  .login {
    :deep(.el-input .el-input__wrapper) {
      margin-top: 15px;
      border-radius: 20px;
      font-size: inherit;
      height: 35px;
      line-height: 35px;
    }
  }
  .el-button {
    width: 70%;
    height: 2rem;
    border-radius: 30px;
    line-height: 35px;
  }
}
</style>
