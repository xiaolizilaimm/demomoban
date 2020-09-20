<template>
  <div class="header">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="item in breadcrumbArr"
        :key="item.title"
        :to="{ path: item.path }"
        >{{ item.title }}</el-breadcrumb-item
      >
    </el-breadcrumb>
    <div class="users">
      <!-- 下拉框 -->
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>黄金糕</el-dropdown-item>
          <el-dropdown-item>狮子头</el-dropdown-item>
          <el-dropdown-item>螺蛳粉</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 头像 -->
      <el-avatar :size="30" :src="circleUrl"></el-avatar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      circleUrl:
        'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      breadcrumbArr: []
    }
  },
  created() {
    this.pathChange()
  },
  methods: {
    pathChange() {
      // console.log(this.$route)
      const arr = [{ title: '首页', path: '/dashboard' }]
      this.$route.matched.forEach(item => {
        if (item.path && item.meta.title) {
          arr.push({
            title: item.meta.title,
            path: item.path
          })
        }
      })
      // console.log(arr)
      this.breadcrumbArr = arr
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
