<template>
  <Card>
    <template #header>
      <h3>订单统计</h3>
    </template>
    <template #content>
      <el-date-picker
        v-model="dateList"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        size="mini"
      ></el-date-picker>
      <el-button type="primary" size="mini" @click="getData">查询</el-button>
      <Echarts></Echarts>
    </template>
  </Card>
</template>

<script>
import { orderTotal } from '@/api/saleCount'
import Card from '@/components/panel'
import moment from 'moment'
import Echarts from './components/Echarts'
export default {
  components: {
    Card,
    Echarts
  },
  data() {
    return {
      dateList: []
    }
  },
  methods: {
    async getData() {
      const arr = []
      this.dateList.forEach((item) => {
        arr.push(moment(item).format('YYYY-MM-DD hh:mm:ss'))
      })
      console.log(arr)
      if (!this.arr) {
        const { data } = await orderTotal({
          date: JSON.stringify(arr)
        })
        console.log(data)
      } else {
        this.$message.error('错误提醒')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-button {
  margin-left: 20px;
}
</style>
