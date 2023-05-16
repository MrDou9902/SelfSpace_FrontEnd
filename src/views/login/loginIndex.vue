<template>
  <div id="login">
    <header>
      <backGroundMusic @playingStatusChange="playingStatusChange" />
      <HeaderAnimation :isPlaying="isPlaying" />
      <div class="login-box" @click="showLoginTable">
        <div class="login-text">
          <span>{{ isLoginTag ? ' 收起' : '登录' }}</span>
          <el-icon v-if="!isLoginTag">
            <ArrowRightBold />
          </el-icon>
          <el-icon v-else>
            <ArrowLeftBold />
          </el-icon>
        </div>
      </div>
    </header>
    <article>
      <CornerAnimation v-if="isPlaying" />
      <div class="words">
        <Transition name="slide-fade-first">
          <span v-if="firstWords && !isLoginTag"
            >Stay True To The Original Aspiration
          </span>
        </Transition>
        <Transition name="slide-fade-last">
          <span v-if="lastWords && !isLoginTag"
            >Just Keep Stepping Forward</span
          >
        </Transition>
      </div>
      <Particles
        id="tsParticles"
        :particlesInit="particlesInit"
        :particlesLoaded="particlesLoaded"
        :options="particleOptions"
      />
      <Transition>
        <div v-if="isLoginTag" class="contain-wrapper">
          <div class="contain">
            <Transition>
              <div v-if="changeItem" class="left-card">
                <div class="welcome">
                  {{ isLogin ? 'Welcome Login!' : 'Welcome Register!' }}
                </div>
              </div>
            </Transition>
            <Transition>
              <div v-if="changeItem" class="right-card">
                <el-card class="el-card">
                  <div class="card-title">
                    {{ isLogin ? '欢迎登录' : '欢迎注册' }}
                  </div>
                  <el-form
                    ref="ruleFormRef"
                    class="loginForm"
                    :model="userLoginForm"
                    :rules="rules"
                    label-position="top"
                    label-width=".7rem"
                  >
                    <el-form-item label="用户名" prop="userName">
                      <el-input
                        v-model="userLoginForm.userName"
                        placeholder="请输入用户名"
                      />
                    </el-form-item>
                    <el-form-item
                      v-show="!isLogin"
                      label="昵称"
                      prop="nickName"
                    >
                      <el-input
                        v-model="userLoginForm.nickName"
                        placeholder="请告诉我该如何称呼您哦~"
                      />
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                      <el-input
                        type="password"
                        v-model="userLoginForm.password"
                        placeholder="请输入密码"
                        @keyup.enter="signIn"
                      />
                    </el-form-item>
                    <el-form-item
                      v-show="!isLogin"
                      label="确认密码"
                      prop="confirmPassword"
                      @keyup.enter="registerFn"
                    >
                      <el-input
                        type="password"
                        v-model="userLoginForm.confirmPassword"
                        placeholder="再次确认密码"
                      />
                    </el-form-item>
                    <el-form-item class="rememberPassword">
                      <el-link :underline="false" @click="toRegister">{{
                        isLogin ? '注册账户' : '返回登录'
                      }}</el-link>
                      <el-link
                        v-if="isLogin"
                        :underline="false"
                        @click="forgetPassword"
                        >忘记密码？</el-link
                      >
                    </el-form-item>
                  </el-form>
                  <div class="button-group">
                    <el-button v-if="isLogin" @click="signIn">登陆</el-button>
                    <el-button v-else @click="registerFn">注册</el-button>
                  </div>
                </el-card>
              </div>
            </Transition>
          </div>
        </div>
      </Transition>
      <ForgetPassWord
        :dialog-visible="dialogVisible"
        @closeDialog="closeDialog"
      ></ForgetPassWord>
    </article>
    <footer>
      Github: &nbsp;
      <el-link href="https://github.com/MrDou9902" target="_blank" type="info"
        >https://github.com/MrDou9902</el-link
      >
      &nbsp; 欢迎Follow!😊
      <el-link
        class="beian"
        href="https://beian.miit.gov.cn"
        target="_blank"
        type="info"
        >许可证编号 ： 鄂ICP备2023007515号</el-link
      >
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { onMounted, reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { loadFull } from 'tsparticles'
import { ElMessage } from 'element-plus'
import { login, register } from '@/api/login'
import localCache from '@/utils/LocalStorage'
import particleOptions from './opts/particleOptions'
import backGroundMusic from './components/BackgroundMusic.vue'
import ForgetPassWord from './components/ForgetPassWord.vue'
import CornerAnimation from './components/CornerAnimation.vue'
import HeaderAnimation from './components/HeaderAnimation.vue'

const firstWords = ref(false)
const dialogVisible = ref(false)
const isPlaying = ref(false)
const lastWords = ref(false)
const loading = ref(false)
const isLogin = ref(true)
const changeItem = ref(true)
const isLoginTag = ref(false)
const userLoginForm = reactive({
  userName: '',
  password: '',
  confirmPassword: '',
  nickName: ''
})
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  confirmPassword: [{ required: false, message: '请确认密码', trigger: 'blur' }]
})

onMounted(() => {
  setTimeout(() => {
    firstWords.value = true
  }, 1000)
  setTimeout(() => {
    lastWords.value = true
  }, 2000)
})

// 开关四个角动画
const playingStatusChange = (val: boolean) => {
  isPlaying.value = val
}

// 粒子画布
const particlesInit = async (engine: unknown) => {
  await loadFull(engine)
}
const particlesLoaded = async () => {
  console.log('粒子效果已渲染！')
}

// 右上角登录按钮
const showLoginTable = () => {
  isLoginTag.value = !isLoginTag.value
  isLogin.value = isLoginTag.value
}

// 添加动画只能手动重置表单
const reset = () => {
  setTimeout(() => {
    changeItem.value = !changeItem.value
    userLoginForm.confirmPassword = ''
    userLoginForm.nickName = ''
    userLoginForm.userName = ''
    userLoginForm.password = ''
    if (isLogin.value) {
      rules.confirmPassword = []
      rules.nickName = []
    } else {
      rules.confirmPassword = [
        { required: true, message: '请确认密码', trigger: 'blur' }
      ]
      rules.nickName = [
        { required: true, message: '请告诉我该如何称呼您哦~', trigger: 'blur' }
      ]
    }
    ruleFormRef.value?.resetFields()
  }, 250)
}

// 登录
const router = useRouter()
const signIn = async () => {
  if (!ruleFormRef.value || !isLogin.value) return
  await ruleFormRef.value.validate((valid) => {
    if (valid) {
      loading.value = true
      login({
        userName: userLoginForm.userName,
        password: userLoginForm.password
      }).then((res) => {
        if (res.code === 0) {
          localCache.setCache('token', res.result.token)
          localCache.setCache('userId', res.result.id)
          localCache.setCache('nickName', res.result.nickName)
          router.push('/home')
        }
        loading.value = false
      })
    }
  })
}

// 注册
const registerFn = async () => {
  if (!ruleFormRef.value) return
  await ruleFormRef.value.validate((valid) => {
    if (valid) {
      if (userLoginForm.confirmPassword !== userLoginForm.password) {
        ElMessage.warning('请检查两次输入的密码是否一致！')
        return
      }
      loading.value = true
      register({
        userName: userLoginForm.userName,
        password: userLoginForm.password,
        nickName: userLoginForm.nickName
      }).then((res) => {
        if (res.code === 0) {
          isLogin.value = true
          changeItem.value = !changeItem.value
          reset()
        }
        loading.value = false
      })
    }
  })
}

// 注册账户界面跳转
const toRegister = () => {
  isLogin.value = !isLogin.value
  changeItem.value = !changeItem.value
  reset()
}

// 忘记密码
const forgetPassword = () => {
  dialogVisible.value = true
}

const closeDialog = () => {
  dialogVisible.value = false
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
@font-face {
  font-family: 'font';
  font-weight: 400;
  src: url('//at.alicdn.com/wf/webfont/q7U3AhN2ySDA/LCgYTYCqab7v.woff2')
      format('woff2'),
    url('//at.alicdn.com/wf/webfont/q7U3AhN2ySDA/xXgWeFGHB9fA.woff')
      format('woff');
  font-display: swap;
}
#login {
  width: 100vw;
  height: 100vh;
  position: relative;
  z-index: 0;
  user-select: none;
}
header {
  width: 100%;
  height: 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 1;
  background-image: linear-gradient(
    to top,
    rgba(253, 253, 253, 0.9921568627) 0%,
    rgb(122 122 122) 100%
  );
  .circle {
    border-radius: 50%;
    width: 0.8rem;
    height: 0.8rem;
  }
  .login-box {
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translateX(20%);
    border-radius: 50%;
    font-weight: 700;
    font-size: 0.23rem;
    color: #534f4fa3;
    background-color: #fff;
    transition: all 0.8s ease;
    cursor: pointer;
    .login-text {
      width: 100%;
      position: absolute;
      top: 50%;
      left: 0.3rem;
      display: flex;
      justify-content: left;
      align-items: center;
      transform: translate(0, -50%);
      transition: left 1.2s ease;
      span {
        margin-right: 0.15rem;
      }
    }
    &:hover {
      color: rgb(201 153 189 / 58%);
      width: 4.5rem;
      height: 4.5rem;
      .login-text {
        left: 1.6rem;
      }
    }
  }
}
article {
  width: 100%;
  height: calc(100% - 1.6rem);
  overflow: hidden;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  bottom: 0.4rem;
  z-index: 2;
  background-size: 100% 100%;
  background-color: #fff;
  background-size: cover;
  .words {
    display: flex;
    justify-content: center;
    flex-direction: column;
    span {
      width: 100%;
      font-size: 0.6rem;
      text-align: center;
      color: #9b89a8a8;
      margin-bottom: 0.6rem;
      font-family: 'font';
    }
  }
  .contain {
    display: flex;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 0.25rem;
    border-top-left-radius: 2.65rem;
    border-bottom-left-radius: 2.65rem;
    border: 1px solid rgba(146, 145, 145, 0.2);
    background-color: rgba(255, 255, 255, 0.1) !important;
    backdrop-filter: blur(0.05rem);
    box-shadow: 0px 0px 0.1rem rgba(218, 215, 225, 0.781),
      0.05rem 0.05rem 0.2rem rgb(193, 218, 218);
    animation: animate 5s linear infinite;
    .left-card {
      width: 5rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-size: 0.5rem;
      font-weight: bold;
      color: rgba(216, 167, 167, 0.589);
      .welcome {
        font-size: 0.45rem;
        height: 30%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 1rem;
        background-image: linear-gradient(
          to right,
          #fdfdfdfd 0%,
          #dbdbdb85 100%
        );
      }
    }
    .right-card {
      width: 4rem;
      padding: 0.2rem 0;
      display: flex;
      justify-content: center;
      align-items: center;
      .el-card {
        width: 70%;
        margin: 0 0.3rem;
        border-radius: 0.25rem;
        background-color: rgba(255, 255, 255, 0.1);
        .el-checkbox {
          color: #333;
        }
        .button-group {
          font-size: 0.16rem;
          .el-button {
            font-size: 0.15rem;
          }
        }
      }
      .card-title {
        opacity: 0.6;
        font-size: 0.25rem;
        font-weight: bold;
        margin-bottom: 0.2rem;
      }
      .loginForm {
        font-size: 0.16rem;
        .rememberPassword :deep(.el-form-item__content) {
          justify-content: space-around;
        }
        :deep(.el-form-item__content .el-link),
        :deep(.el-form-item__label) {
          font-size: 0.15rem;
        }
        :deep(.el-input .el-input__wrapper) {
          height: 0.35rem;
          border-radius: 0.18rem;
          font-size: inherit;
          line-height: 0.35rem;
        }
      }
      .el-button {
        width: 80%;
        height: 0.35rem;
        border-radius: 0.3rem;
        line-height: 0.35rem;
      }
    }
  }
}
footer {
  width: 100%;
  height: 0.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: 0.4rem;
  position: fixed;
  bottom: 0;
  z-index: 2;
  background: #3333338a;
  color: #ffffffb7;
  font-family: Arial;
  font-size: 0.12rem;
  letter-spacing: 1px;
  .el-link {
    color: #d2c3ddba;
  }
  .beian {
    position: absolute;
    right: 0;
    color: #ffffffb4;
    font-size: 0.12rem;
  }
}
:deep(.el-dialog) {
  width: 4rem;
  padding: 0.2rem 0;
  margin: 0;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border-radius: 0.25rem;
  border: 1px solid rgba(146, 145, 145, 0.2);
  background-color: rgba(246, 247, 244, 0.904) !important;
  backdrop-filter: blur(0.05rem);
  box-shadow: 0px 0px 0.1rem rgba(218, 215, 225, 0.781),
    0.05rem 0.05rem 0.2rem rgb(193, 218, 218);
  animation: animate 5s linear infinite;
  .el-dialog__footer {
    width: 70%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .el-dialog__header {
    font-size: 0.16rem;
    margin: 0;
    padding: 0 0 0.1rem 0;
    .el-dialog__title {
      color: #5b5d5f;
      font-weight: bold;
      font-size: 0.22rem;
    }
  }
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.4s ease;
}
.slide-fade-last-leave-active,
.slide-fade-first-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-first-enter-active,
.slide-fade-last-enter-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-last-enter-from,
.slide-fade-last-leave-to {
  transform: translateX(1rem);
  opacity: 0;
}
.slide-fade-first-enter-from,
.slide-fade-first-leave-to {
  transform: translateX(-1rem);
  opacity: 0;
}
</style>
