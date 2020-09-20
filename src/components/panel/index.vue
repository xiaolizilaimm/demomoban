<template>
  <el-card>
    <div class="header">
      <slot name="header"></slot>
    </div>
    <div class="content">
      <slot name="content"></slot>
    </div>
  </el-card>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
/deep/.el-card__body {
  padding: 0;
}
.header {
  border-bottom: 1px solid #ccc;
  padding: 20px;
}
.content {
  padding: 20px;
}
</style>
