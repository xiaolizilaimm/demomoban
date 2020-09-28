<template>
  <div id="main" :style="{ width: '100%', height: '600px' }"></div>
</template>

<script>
import echarts from 'echarts'
export default {
  data() {
    return {
      option: {
        title: {
          text: ''
        },
        tooltip: {},
        legend: {
          data: ['']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      }
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      const myChart = echarts.init(document.getElementById('main'))

      myChart.setOption(this.option)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
