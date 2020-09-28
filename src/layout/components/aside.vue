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
    <template v-for="item in menu">
      <el-menu-item
        v-if="
          (item.children && item.children === 1) || item.path === '/dashboard'
        "
        :index="item.path"
        :key="item.path"
      >
        <i class="iconfont" :class="item.meta.icon"></i>
        <span slot="title">{{ item.meta.title }}</span>
      </el-menu-item>
      <el-submenu v-else :index="item.path" :key="item.path">
        <template slot="title">
          <i class="iconfont" :class="item.meta.icon"></i>
          <span>{{ item.meta.title }}</span>
        </template>
        <el-menu-item
          v-for="item2 in item.children"
          :key="item2.path"
          :index="item2.path"
          >{{ item2.meta.title }}</el-menu-item
        >
      </el-submenu>
    </template>
  </el-menu>
</template>

<script>
import local from '@/utils/local'
export default {
  created() {
    this.menu = JSON.parse(local.get('menu'))
    console.log(this.menu)
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
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
