<template>
  <el-row :gutter="20">
    <el-col :span="6" v-for="(item,i) in cardList" :key="item.id">
      <div>
        <i :class="'iconfont ' + item.icon" :style="{ color:colorArr[i] }"></i>
      </div>
      <div>
        <span>{{ item.title }}</span>
        <p>{{ dataList[item.name] }}</p>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: {
    dataList: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      colorArr: ['#1296db', '#d4237a', '#1296db', '#1afa29'],
      cardList: [
        {
          id: 1,
          icon: 'icon-wenjian',
          title: '总订单',
          name: 'totalOrder'
        },
        {
          id: 2,
          icon: 'icon-Dollar',
          title: '总销售额',
          name: 'totalAmount'
        },
        {
          id: 3,
          icon: 'icon-renwu',
          title: '今日订单数',
          name: 'todayOrder'
        },
        {
          id: 4,
          icon: 'icon-renminbi',
          title: '今日销售额',
          name: 'totayAmount'
        }
      ]
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
