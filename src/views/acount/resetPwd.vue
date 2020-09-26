<template>
  <div>
    <Panel>
      <template #header>
        <h3>修改密码</h3>
      </template>
      <template #content>
        <div class="acountAdd">
          <el-form
            :model="resetPwd"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
            size="mini"
          >
            <el-form-item label="原密码" prop="pwd">
              <el-input type="password" v-model="resetPwd.pwd"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPwd">
              <el-input type="password" v-model="resetPwd.newPwd"></el-input>
            </el-form-item>
            <el-form-item label="确定新密码" prop="newPwd2">
              <el-input type="password" v-model="resetPwd.newPwd2"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </template>
    </Panel>
  </div>
</template>

<script>
import Panel from '@/components/panel/index'
import local from '@/utils/local'
import { pwdReg } from '@/utils/validate.js'
import { checkoldpwd, editpwd } from '@/api/acount'

export default {
  components: {
    Panel
  },
  data() {
    var originalPwd = async (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码不能为空'))
      } else {
        const data = await checkoldpwd({
          oldPwd: this.resetPwd.pwd
        })
        if (data.code === '11') {
          callback(new Error('再好好想想原密码吧!'))
        } else {
          callback()
        }
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码不能为空'))
      } else if (!pwdReg.test(value)) {
        callback(new Error('至少5-16个字符'))
      } else {
        if (this.resetPwd.newPwd2 !== '') {
          this.$refs.ruleForm.validateField('newPwd2')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.resetPwd.newPwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      resetPwd: {
        pwd: '',
        newPwd: '',
        newPwd2: ''
      },
      rules: {
        pwd: [{ validator: originalPwd, trigger: 'blur' }],
        newPwd: [{ validator: validatePass, trigger: 'blur' }],
        newPwd2: [{ validator: validatePass2, trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const { code } = await editpwd({
            newPwd: this.resetPwd.newPwd
          })
          if (code === 0) {
            local.rem('k_v')
            this.$router.push('/login')
          }
        } else {
          this.$message({
            message: '验证不通过',
            type: 'error',
            duration: 2000
          })
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.acountAdd {
  .el-input {
    width: 200px;
  }
  .el-select {
    width: 200px;
  }
}
</style>
