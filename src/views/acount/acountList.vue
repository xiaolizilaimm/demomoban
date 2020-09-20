<template>
  <div>
    <Panel>
      <template #header>
        <h3>账号列表</h3>
      </template>
      <template #content>
        <div>
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column prop="uanme" label="账号" width="120">
            </el-table-column>
            <el-table-column prop="group" label="用户组" width="120">
            </el-table-column>
            <el-table-column prop="ctime" label="创建时间" width="120">
            </el-table-column>
            <el-table-column label="操作">
              <template>
                <el-button type="primary" size="mini">编辑</el-button>
                <el-button type="danger" size="mini">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
          >
          </el-pagination>
          <div>
            <el-button
              type="primary"
              @click="toggleSelection([tableData[1], tableData[2]])"
              >切换第二、第三行的选中状态</el-button
            >
            <el-button type="danger" @click="toggleSelection()"
              >取消选择</el-button
            >
          </div>
        </div>
      </template>
    </Panel>
  </div>
</template>

<script>
import Panel from '../../components/panel/index'
export default {
  components: {
    Panel
  },
  data() {
    return {
      tableData: [
        {
          uanme: '小貂蝉',
          group: '超级管理员',
          ctime: '2020/09/18'
        },
        {
          uanme: '小貂蝉',
          group: '超级管理员',
          ctime: '2020/09/18'
        },
        {
          uanme: '小貂蝉',
          group: '超级管理员',
          ctime: '2020/09/18'
        },
        {
          uanme: '小貂蝉',
          group: '超级管理员',
          ctime: '2020/09/18'
        },
        {
          uanme: '小貂蝉',
          group: '超级管理员',
          ctime: '2020/09/18'
        }
      ],
      multipleSelection: [],
      currentPage: 1
    }
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-pagination {
  margin: 20px 0 10px;
}
</style>
