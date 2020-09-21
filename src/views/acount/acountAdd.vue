<template>
  <div>
    <Panel>
      <template #header>
        <h3>添加账号</h3>
      </template>
      <template #content>
        <div class="acountAdd">
          <el-form
            :model="acountAdd"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
            size="mini"
          >
            <el-form-item label="账号" prop="uname">
              <el-input v-model="acountAdd.uname"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pwd">
              <el-input type="password" v-model="acountAdd.pwd"></el-input>
            </el-form-item>
            <el-form-item label="用户组">
              <el-select v-model="acountAdd.group" placeholder="请选择用户组">
                <el-option label="普通管理员" value="普通管理员"></el-option>
                <el-option label="超级管理员" value="超级管理员"></el-option>
              </el-select>
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
import { acountAdd } from '@/api/acount.js'
export default {
  components: {
    Panel
  },
  data() {
    return {
      acountAdd: {
        uname: '',
        pwd: '',
        group: ''
      },
      rules: {
        uname: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const data = await acountAdd({
            account: this.acountAdd.uname,
            password: this.acountAdd.pwd,
            userGroup: this.acountAdd.group
          })
          console.log(data)
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
