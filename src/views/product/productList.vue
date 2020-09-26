<template>
  <Card>
    <template #header>
      <h3>商品列表</h3>
    </template>
    <template #content>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template v-slot="{row}">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品ID">
                <span>{{ row.id }}</span>
              </el-form-item>
              <el-form-item label="所属分类">
                <span>{{ row.category }}</span>
              </el-form-item>
              <el-form-item label="商品图片">
                <el-avatar shape="square" :size="50" :src="row.imgUrl"></el-avatar>
              </el-form-item>
              <el-form-item label="商品评价">
                <span>{{ row.rating }}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{ row.goodsDesc }}</span>
              </el-form-item>
              <el-form-item label="商品名称">
                <span>{{ row.name }}</span>
              </el-form-item>
              <el-form-item label="商品价格">
                <span>{{ row.price }}</span>
              </el-form-item>
              <el-form-item label="创建时间">
                <span>{{ row.ctime | timeReset }}</span>
              </el-form-item>
              <el-form-item label="商品销售">
                <span>{{ row.sellCount }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" prop="name"></el-table-column>
        <el-table-column label="所属分类" prop="category"></el-table-column>
        <el-table-column label="商品价格" prop="price"></el-table-column>
        <el-table-column label="商品图片">
          <template v-slot="{row}">
            <el-image style="width: 80px; height: 100px" :src="row.imgUrl"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="商品描述" prop="goodsDesc"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="{row}">
            <el-button type="primary" @click="dialogFormVisible = true">编辑</el-button>
            <el-button type="danger" @click="delData(row.id)">删除</el-button>
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
      <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="活动名称">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="活动区域">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </template>
  </Card>
</template>

<script>
import Card from '@/components/panel'
import { dataList, dataDel } from '@/api/product'
import { timeReset } from '@/filters'

export default {
  components: {
    Card
  },
  filters: {
    timeReset
  },
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 5,
      total: 0,
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  created() {
    this.dataList()
  },
  methods: {
    async dataList() {
      const { data, total } = await dataList({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      })
      data.forEach((item) => {
        item.imgUrl = `http://127.0.0.1:5000/upload/imgs/goods_img/${item.imgUrl}`
      })
      this.tableData = data
      this.total = total
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.dataList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.dataList()
    },
    delData(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const data = await dataDel({
            id
          })
          if (data.code === 0) {
            this.dataList()
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
/deep/.el-avatar {
  vertical-align: middle;
}
</style>
