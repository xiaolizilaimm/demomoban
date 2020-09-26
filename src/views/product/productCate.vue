<template>
  <Card>
    <template #header>
      <div class="header">
        <h3>商品列表</h3>
        <el-button type="primary" size="mini" @click="dialogFormVisible = true">添加分类</el-button>
      </div>
    </template>
    <template #content>
      <el-table ref="singleTable" :data="tableData" highlight-current-row style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column label="分类名称">
          <template v-slot="{row}">
            <div v-if="row.isFlag">{{row.cateName}}</div>
            <el-input v-else v-model="row.cateName" size="mini"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="是否启用">
          <template v-slot="{row}">
            <el-switch
              v-model="row.state"
              active-color="#13ce66"
              :disabled="row.isFlag"
              inactive-color="#ff4949"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column property="address" label="操作">
          <template v-slot="{row}">
            <el-button
              :type="row.isFlag ? '': 'success'"
              size="mini"
              @click="compile(row.id)"
            >{{row.isFlag ? '编辑': '完成'}}</el-button>
            <el-button type="danger" size="mini" @click="delData(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
      <!-- 对话框 -->
      <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
        <el-form :model="form" label-width="100px" :rules="rules" ref="ruleForm">
          <el-form-item label="分类名称:" prop="cateName">
            <el-input v-model="form.cateName" autocomplete="off" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="是否启用:">
            <el-switch v-model="form.state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addCateData">确 定</el-button>
        </div>
      </el-dialog>
    </template>
  </Card>
</template>

<script>
import Card from '@/components/panel'
import { catelist, editcate, addcate, delcate } from '@/api/product'
export default {
  components: {
    Card
  },
  data() {
    return {
      tableData: [],
      currentRow: null,
      currentPage: 1,
      pageSize: 5,
      total: 0,
      dialogFormVisible: false,
      form: {
        cateName: '',
        state: true
      },
      rules: {
        cateName: { required: true, message: '请输入分类名称', trigger: 'blur' }
      }
    }
  },
  created() {
    this.getDataList()
  },
  methods: {
    // 获取数据
    async getDataList() {
      if (this.tableData.length === 1 && this.currentPage > 1) {
        this.currentPage--
      }
      const { data, total } = await catelist({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      })
      this.total = total
      this.tableData = []
      data.forEach((item) => {
        // 把传来的1和0转换成false和true
        item.state = Boolean(item.state)
        // 给每一行设置开关
        item.isFlag = true
        this.tableData.push(item)
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getDataList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getDataList()
    },
    // 修改数据
    async compile(id) {
      const dataLine = this.tableData.find((item) => item.id === id)
      if (dataLine.isFlag) {
        dataLine.isFlag = false
      } else {
        const data = await editcate(dataLine)
        if (data.code === 0) {
          dataLine.isFlag = true
        }
      }
    },
    // 添加数据
    addCateData() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          const data = await addcate(this.form)
          if (data.code === 0) {
            this.getDataList()
          }
          this.form = {
            cateName: '',
            state: true
          }
          this.dialogFormVisible = false
        } else {
          this.$message.error('请输入正确的数据!')
          return false
        }
      })
    },
    // 删除数据
    delData(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const data = await delcate({ id })
          if (data.code === 0) {
            this.getDataList()
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.el-pagination {
  margin-top: 20px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
