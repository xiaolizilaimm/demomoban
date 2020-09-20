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
              <el-button type="primary" @click="submitForm('ruleForm')"
                >立即创建</el-button
              >
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </template>
    </Panel>
  </div>
</template>

<script>
import Panel from '../../components/panel/index'
import { pwdReg } from '../../utils/validate.js'

export default {
  components: {
    Panel
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码不能为空'))
      } else if (!pwdReg.test(value)) {
        callback(
          new Error(
            '至少8-16个字符，至少1个大写字母，1个小写字母和1个数字，其他可以是任意字符'
          )
        )
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
        pwd: [{ validator: validatePass, trigger: 'blur' }],
        newPwd: [{ validator: validatePass, trigger: 'blur' }],
        newPwd2: [{ validator: validatePass2, trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
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
