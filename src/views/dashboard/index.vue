<template>
  <div class="dashboard">
    <Card :dataList="sonData" />
    <Ech :optData="echData"></Ech>
  </div>
</template>

<script>
import Card from './components/card'
import Ech from './components/Echarts'
import { totaldata } from '@/api/dashboard'
export default {
  components: {
    Card,
    Ech
  },
  data() {
    return {
      sonData: {},
      echData: {}
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      const {
        todayOrder,
        totalAmount,
        totalOrder,
        totayAmount,
        amountData,
        orderData,
        xData
      } = await totaldata()
      this.sonData = {
        todayOrder,
        totalAmount,
        totalOrder,
        totayAmount
      }
      this.echData = {
        amountData,
        orderData,
        xData
      }
      // console.log(data)
    },
    opt(o) {
      this.optData = o
    }
  }
}
</script>

<style lang="scss" scoped></style>
