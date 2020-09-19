<template>
  <div class="login">
    <div class="login_box">
      <h3>系统登录</h3>
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item prop="uname" label="用戶名:">
          <el-input type="text" v-model.number="loginForm.uname" prefix-icon="iconfont icon-yonghu"></el-input>
        </el-form-item>
        <el-form-item prop="pass" label="密码:">
          <el-input
            :type="flagEye ? 'password' : 'text'"
            v-model="loginForm.pass"
            autocomplete="off"
            prefix-icon="iconfont icon-mima"
          >
            <i
              slot="suffix"
              class="eye iconfont"
              :class="flagEye ? 'icon-eyes' : 'icon-eyes-'"
              @click="btnEye"
            ></i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <div class="btn">
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        uname: '',
        pass: ''
      },
      rules: {
        pass: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ],
        uname: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
        ]
      },
      flagEye: true
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message({
            message: '恭喜你，登录成功',
            type: 'success',
            duration: 2000
          })
          this.$router.push('/')
        } else {
          this.$message({
            message: '验证失败',
            type: 'error',
            duration: 2000
          })
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    btnEye() {
      console.log('点击了')
      this.flagEye = !this.flagEye
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  // width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(45, 58, 75);
  text-align: center;

  .login_box {
    width: 400px;
    padding: 30px;
    h3 {
      margin-bottom: 30px;
      font-size: 16px;
      letter-spacing: 3px;
      font-weight: 700;
      color: #fff;
      text-indent: 4em;
    }
    .btn {
      text-align: center;
    }
    .eye {
      position: absolute;
      right: 30px;
    }
  }
}
// 穿刺
// /deep/ .el-form-item__label {
//   color: #fff;
// }
</style>
