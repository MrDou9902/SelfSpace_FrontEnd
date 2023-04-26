<template>
  <Particles
    id="tsparticles"
    :particlesInit="particlesInit"
    :particlesLoaded="particlesLoaded"
    :options="particleOptions"
  />
  <div id="login">
    <div id="contain">
      <Transition>
        <div v-if="changeItem" id="left-card">
          <div class="welcome">
            {{ isLogin ? 'Welcome Login!' : 'Welcome Register!' }}
          </div>
        </div>
      </Transition>
      <Transition>
        <div v-if="changeItem" id="right-card">
          <el-card class="el-card">
            <h2 style="opacity: 0.6">
              {{ isLogin ? '欢迎登录' : '欢迎注册' }}
            </h2>
            <el-form
              ref="ruleFormRef"
              class="loginForm"
              :model="userLoginForm"
              :rules="rules"
              label-position="top"
              label-width="70px"
            >
              <el-form-item label="用户名" prop="userName">
                <el-input
                  v-model="userLoginForm.userName"
                  placeholder="请输入用户名"
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
                <el-checkbox
                  v-if="isLogin"
                  v-model="userLoginForm.isRemember"
                  :true-label="1"
                  :false-label="0"
                  size="large"
                  >记住密码</el-checkbox
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
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { reactive, ref } from 'vue';
import { login, register } from '@/api/login';
import type { FormInstance, FormRules } from 'element-plus';
import { ElMessage } from 'element-plus';
import localCache from '@/utils/LocalStorage';
import particleOptions from './particleOptions';
import { loadFull } from 'tsparticles';

const particlesInit = async (engine: any) => {
  await loadFull(engine);
};

const particlesLoaded = async (container: any) => {
  console.log('Particles container loaded', container);
};
const router = useRouter();
const isLogin = ref(true);
const changeItem = ref(true);
const userLoginForm = reactive({
  userName: '',
  password: '',
  isRemember: 0,
  confirmPassword: '',
});
const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
  userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  confirmPassword: [
    { required: false, message: '请确认密码', trigger: 'blur' },
  ],
});

// 添加动画只能手动重置表单
const reset = () => {
  setTimeout(() => {
    changeItem.value = !changeItem.value;
    userLoginForm.confirmPassword = '';
    userLoginForm.userName = '';
    userLoginForm.password = '';
    if (isLogin.value) {
      rules.confirmPassword = [];
    } else {
      rules.confirmPassword = [
        { required: true, message: '请确认密码', trigger: 'blur' },
      ];
    }
    ruleFormRef.value?.resetFields();
  }, 250);
};

// 登录
const signIn = async () => {
  console.log(
    ruleFormRef.value,
    isLogin.value,
    !ruleFormRef.value || !isLogin.value,
    rules
  );

  if (!ruleFormRef.value || !isLogin.value) return;
  await ruleFormRef.value.validate((valid) => {
    if (valid) {
      login({
        userName: userLoginForm.userName,
        password: userLoginForm.password,
      }).then((res) => {
        if (res.code === 0) {
          localCache.setCache('token', res.result.token);
          router.push('/home');
        }
      });
    }
  });
};

// 注册
const registerFn = async () => {
  if (!ruleFormRef.value) return;
  await ruleFormRef.value.validate((valid) => {
    if (valid) {
      if (userLoginForm.confirmPassword !== userLoginForm.password) {
        ElMessage.warning('请检查两次输入的密码是否一致！');
        return;
      }
      register({
        userName: userLoginForm.userName,
        password: userLoginForm.password,
      }).then((res) => {
        if (res.code === 0) {
          isLogin.value = true;
          changeItem.value = !changeItem.value;
          reset();
        }
      });
    }
  });
};

// 注册账户界面跳转
const toRegister = () => {
  isLogin.value = !isLogin.value;
  changeItem.value = !changeItem.value;
  reset();
};
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
  // background-image: url(../../assets/cat&fish.webp);
  background-size: 100% 100%;
  // background-color: #a7a8bd;
  #contain {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 25px;
    border-top-left-radius: 225px;
    border-bottom-left-radius: 225px;
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
  // flex-direction: row;
  text-align: center;
  // align-items: center;
  #left-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-top-left-radius: 225px;
    border-bottom-left-radius: 225px;
    width: 500px;
    font-size: 50px;
    font-weight: bold;
    color: aliceblue;
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
    .welcome {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 30%;
      border-radius: 100px;
      background-image: linear-gradient(to top, #fad0c4bd 0%, #ffd1ffa1 100%);
    }
  }
  #right-card {
    padding: 20px 0;
    width: 400px;
    .el-card {
      margin: 0 30px;
      width: 70%;
      border-radius: 25px;
      background-color: rgba(255, 255, 255, 0.1);
      .el-checkbox {
        color: #333;
      }
    }
  }
}
#right-card {
  display: flex;
  justify-content: center;
  align-items: center;
  h2 {
    margin-bottom: 10px;
  }
  .loginForm {
    .rememberPassword :deep(.el-form-item__content) {
      justify-content: space-around;
    }
    :deep(.el-input .el-input__wrapper) {
      border-radius: 18px;
      font-size: inherit;
      height: 35px;
      line-height: 35px;
    }
  }
  .el-button {
    width: 80%;
    height: 2rem;
    border-radius: 30px;
    line-height: 35px;
  }
}
</style>
