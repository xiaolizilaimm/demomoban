<template>
  <div class="header">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="item in breadcrumbArr"
        :key="item.title"
        :to="{ path: item.path }"
      >{{ item.title }}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="users">
      <!-- 下拉框 -->
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          欢迎你,{{userList.account}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="my">个人中心</el-dropdown-item>
          <el-dropdown-item command="out" divided>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 头像 -->
      <el-avatar :size="30" :src="userList.imgUrl"></el-avatar>
    </div>
  </div>
</template>

<script>
import local from '@/utils/local'
import { userList } from '@/api/acount'

export default {
  data() {
    return {
      circleUrl:
        'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      breadcrumbArr: [],
      userList: {}
    }
  },
  created() {
    this.pathChange()
    this.getUserList()
  },
  methods: {
    pathChange() {
      // 面包屑
      const arr = [{ title: '首页', path: '/dashboard' }]
      this.$route.matched.forEach((item) => {
        if (item.path && item.meta.title) {
          arr.push({
            title: item.meta.title,
            path: item.path
          })
        }
      })
      this.breadcrumbArr = arr
    },
    handleCommand(command) {
      switch (command) {
        case 'my':
          this.$router.push('/myCenter')
          break
        case 'out':
          local.rem('k_v')
          this.$router.push('/login')
          break
        default:
          break
      }
    },
    async getUserList() {
      const { accountInfo } = await userList()
      this.userList = accountInfo
    }
  },
  watch: {
    '$route.path'() {
      this.pathChange()
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}
.el-avatar {
  vertical-align: middle;
  margin-left: 20px;
}
</style>
