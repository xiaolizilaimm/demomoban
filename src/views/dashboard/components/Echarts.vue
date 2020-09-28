<template>
  <div ref="Chart" :style="{ width: '100%', height: '600px' }"></div>
</template>

<script>
import Echarts from 'echarts'
export default {
  props: {
    optData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      option: {
        title: {
          text: '折线图堆叠'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['销售统计', '订单统计']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '销售统计',
            type: 'line',
            stack: '总量',
            data: []
          },
          {
            name: '订单统计',
            type: 'line',
            stack: '总量',
            data: []
          }
        ]
      }
    }
  },
  created() {
    this.$emit('echData', this.option)
  },
  methods: {
    getEcharts() {
      const myChart = Echarts.init(this.$refs.Chart)

      myChart.setOption(this.option)
    }
  },
  watch: {
    optData() {
      const { amountData, orderData, xData } = this.optData
      this.option.series[0].data = amountData
      this.option.series[1].data = orderData
      this.option.xAxis.data = xData
      this.getEcharts()
    },
    deep: true
  }
}
</script>

<style lang="scss" scoped></style>
