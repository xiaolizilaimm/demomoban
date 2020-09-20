<template>
  <el-row :gutter="20">
    <el-col :span="6" v-for="(item,i) in dataList" :key="item.id">
      <div>
        <i :class="'iconfont ' + item.icon" :style="{ color:colorArr[i] }"></i>
      </div>
      <div>
        <span>{{ item.title }}</span>
        <p>{{ item.num }}</p>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: {
    dataList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      colorArr: ['#1296db', '#d4237a', '#1296db', '#1afa29']
    }
  }
}
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  width: 23%;
  border-radius: 4px;
  display: flex;
  background-color: #fff;
  padding: 20px;
  margin: 0 10px;
  border-radius: 6px;
  div {
    flex: 1;
    text-align: center;
    align-self: center;
    &:first-of-type {
      i {
        font-size: 44px;
        color: #1296db;
      }
    }
    &:last-of-type {
      span {
        color: #666;
      }
      p {
        margin-top: 10px;
        font-weight: 700;
      }
    }
  }
}
</style>
