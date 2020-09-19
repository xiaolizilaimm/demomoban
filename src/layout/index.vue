<template>
  <el-container>
    <el-aside :width="isCollapse ? '64px' : '200px'">
      <h3 class="head_title">
        <div>
          <img src="../assets/images/logo.png" alt @click="isCollapse = !isCollapse" />
        </div>
        <span v-show="!isCollapse">外卖管理系统</span>
      </h3>
      <Aside :bool="isCollapse" />
    </el-aside>
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Aside from './components/aside'
import Header from './components/header'

export default {
  components: {
    Aside,
    Header
  },
  data() {
    return {
      isCollapse: false
    }
  }
}
</script>

<style lang="scss" scoped>
.el-container {
  width: 100%;
  height: 100%;
}
.el-aside {
  background: #2b3c4d;
}
.el-header {
  background: pink;
}
.head_title {
  display: flex;
  justify-content: center;
  height: 44px;
  line-height: 44px;
  color: #fff;
  padding: 20px 0;
  img {
    width: 40px;
  }
}
</style>
