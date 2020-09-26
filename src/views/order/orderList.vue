<template>
  <el-card>
    <!-- 查询 -->
    <el-form
      :inline="true"
      :model="formData"
      ref="ruleForm"
      class="demo-form-inline"
      size="mini"
    >
      <el-form-item label="订单号">
        <el-input v-model="formData.orderNo" placeholder="订单号"></el-input>
      </el-form-item>
      <el-form-item label="收货人">
        <el-input v-model="formData.consignee" placeholder="收货人"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="formData.phone" placeholder="手机号"></el-input>
      </el-form-item>

      <el-form-item label="订单状态">
        <el-select v-model="formData.orderState" placeholder="订单状态">
          <el-option label="已受理" value="已受理"></el-option>
          <el-option label="未受理" value="未受理"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择时间">
        <el-date-picker
          v-model="formData.date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-button type="primary" size="mini" @click="onSubmit">查询</el-button>
      <el-button type="primary" size="mini" @click="resetForm('ruleForm')"
        >重置</el-button
      >
    </el-form>

    <!-- 表单 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column
        fixed
        prop="orderNo"
        label="订单号"
        width="150"
      ></el-table-column>
      <el-table-column label="下单时间" width="200">
        <template v-slot="{ row }">{{ row.orderTime | timeReset }}</template>
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="consignee"
        label="收货人"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="deliverAddress"
        label="配送地址"
        width="300"
      ></el-table-column>
      <el-table-column label="送达时间" width="200">
        <template v-slot="{ row }">{{ row.orderTime | timeReset }}</template>
      </el-table-column>
      <el-table-column
        prop="remarks"
        label="用户备注"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="orderAmount"
        label="订单金额"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="orderState"
        label="订单状态"
        width="120"
      ></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template v-slot="{ row }">
          <el-button @click="handleClick(row)" type="text" size="small"
            >查看</el-button
          >
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </el-card>
</template>

<script>
import { getList, searchList } from '@/api/order'
import { timeReset } from '@/filters'
import moment from 'moment'
export default {
  filters: {
    timeReset
  },
  data() {
    return {
      formData: {
        orderNo: '',
        consignee: '',
        phone: '',
        orderState: '',
        date: []
      },
      currentPage: 1,
      pageSize: 5,
      total: 0,
      tableData: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      const { data, total } = await getList({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        orderNo: this.formData.orderNo,
        consignee: this.formData.consignee,
        phone: this.formData.phone,
        orderState: this.formData.orderState,
        date: JSON.stringify(this.formData.date)
      })
      this.tableData = data
      this.total = total
    },
    async onSubmit() {
      this.currentPage = 1
      const arr = []
      this.formData.date.forEach(item => {
        arr.push(moment(item).format('YYYY-MM-DD h:mm:ss'))
      })
      this.formData.date = arr
      const { data, total } = await searchList({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        orderNo: this.formData.orderNo,
        consignee: this.formData.consignee,
        phone: this.formData.phone,
        orderState: this.formData.orderState,
        date: JSON.stringify(this.formData.date)
      })
      console.log(data)
      this.tableData = data
      this.total = total
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getData()
    },
    handleClick(row) {
      console.log(row)
    },
    resetForm(ruleForm) {
      this.$refs[ruleForm].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped></style>
