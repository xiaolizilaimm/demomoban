<template>
  <div class="dashboard">
    <Card :dataList="cardList" />
    <Echarts />
  </div>
</template>

<script>
import Card from './components/card'
import Echarts from './components/Echarts'
export default {
  components: {
    Card,
    Echarts
  },
  data() {
    return {
      cardList: [
        {
          id: 1,
          icon: 'icon-wenjian',
          title: '总订单',
          num: '102,400'
        },
        {
          id: 2,
          icon: 'icon-Dollar',
          title: '总销售额',
          num: '102,400'
        },
        {
          id: 3,
          icon: 'icon-renwu',
          title: '今日订单数',
          num: '102,400'
        },
        {
          id: 4,
          icon: 'icon-renminbi',
          title: '今日销售额',
          num: '102,400'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped></style>
