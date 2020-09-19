<template>
  <el-menu
    :default-active="$route.path"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#2b3c4d"
    text-color="#fff"
    active-text-color="#409eff"
    :collapse="bool"
    :collapse-transition="false"
    router
  >
    <el-menu-item index="/dashboard">
      <i class="iconfont icon-shouye"></i>
      <span slot="title">后台首页</span>
    </el-menu-item>
    <el-menu-item index="/order/index">
      <i class="iconfont icon-icon-"></i>
      <span slot="title">订单管理</span>
    </el-menu-item>
    <el-submenu index="/product/index">
      <template slot="title">
        <i class="iconfont icon-shangpin"></i>
        <span>商品管理</span>
      </template>
      <el-menu-item index="/product/index">商品列表</el-menu-item>
      <el-menu-item index="/product/productadd">商品添加</el-menu-item>
      <el-menu-item index="/product/productcate">商品分类</el-menu-item>
    </el-submenu>
    <el-menu-item index="/store/index">
      <i class="iconfont icon-dianpu"></i>
      <span slot="title">店铺管理</span>
    </el-menu-item>
    <el-submenu index="/acount/index">
      <template slot="title">
        <i class="iconfont icon-zhanghao"></i>
        <span>账号管理</span>
      </template>
      <el-menu-item index="/acount/index">站好列表</el-menu-item>
      <el-menu-item index="/acount/acountAdd">添加账号</el-menu-item>
      <el-menu-item index="/acount/resetPwd">修改密码</el-menu-item>
    </el-submenu>
    <el-submenu index="/saleCount/goodsCount">
      <template slot="title">
        <i class="iconfont icon-tongji"></i>
        <span>销售统计</span>
      </template>
      <el-menu-item index="/saleCount/goodsCount">商品统计</el-menu-item>
      <el-menu-item index="/saleCount/orderCount">订单统计</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  },
  created() {
    console.log(this.$router)
  },
  props: {
    bool: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
.el-menu {
  border-right: 0;
  i {
    color: #fff;
    margin-right: 8px;
  }
}
</style>
