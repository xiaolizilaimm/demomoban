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
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="uanme" label="账号" width="150"></el-table-column>
            <el-table-column prop="group" label="用户组" width="150"></el-table-column>
            <el-table-column label="创建时间" width="250">
              <template v-slot="{ row }">{{row.ctime | timeReset}}</template>
            </el-table-column>
            <el-table-column label="操作">
              <template v-slot="{ row }">
                <el-button type="primary" size="mini" @click="edit(row)">编辑</el-button>
                <el-button type="danger" size="mini" @click="deleteUser(row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
          <div>
            <el-button type="danger" @click="batchDelete()">批量刪除</el-button>
            <el-button type="primary" @click="toggleSelection()">取消选择</el-button>
          </div>
        </div>
      </template>
    </Panel>
    <!-- 弹出框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <el-form
        :model="acountAdd"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        size="mini"
      >
        <el-form-item label="账号" prop="account">
          <el-input v-model="acountAdd.account"></el-input>
        </el-form-item>
        <el-form-item label="用户组">
          <el-select v-model="acountAdd.userGroup" placeholder="请选择用户组">
            <el-option label="普通管理员" value="普通管理员"></el-option>
            <el-option label="超级管理员" value="超级管理员"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dataUpdata">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Panel from '@/components/panel/index'
import { acountList, remUser, batchDel, modifyUser } from '@/api/acount'
import { timeReset } from '@/filters'

export default {
  components: {
    Panel
  },
  data() {
    return {
      tableData: [] /* 页面的数据 */,
      multipleSelection: [],
      tableChecked: [],
      ids: [],
      currentPage: 1 /* 当前页面 */,
      pageSize: 5 /* 一页展示的多少条 */,
      total: 0 /* 总页数 */,
      dialogVisible: false /* 弹出框 */,
      acountAdd: {
        account: '',
        userGroup: '',
        id: ''
      },
      rules: {
        account: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.userList()
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val
      this.userList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.userList()
    },
    async userList() {
      const { data, total } = await acountList({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      })
      this.tableData = []
      data.forEach((item) => {
        this.tableData.push({
          uanme: item.account,
          group: item.userGroup,
          ctime: item.ctime,
          id: item.id,
          img: item.imgUrl
        })
      })
      this.total = total
    },
    deleteUser(id) {
      console.log(this.tableData.length === 1 && this.currentPage > 1)
      // 判断当前页面数据的长度并且页数大于1时,删除后页面减一
      if (this.tableData.length === 1 && this.currentPage > 1) {
        this.currentPage--
      }
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const data = await remUser({ id })
          if (data.code === 0) {
            this.userList()
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.ids = []
      val.forEach((item) => {
        this.ids.push(item.id)
      })
    },
    toggleSelection() {
      this.$refs.multipleTable.clearSelection()
    },
    batchDelete() {
      // 批量删除
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const data = await batchDel({
            ids: JSON.stringify(this.ids)
          })
          if (data.code === 0) {
            this.userList()
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    edit(par) {
      this.dialogVisible = true
      console.log(par)
      this.acountAdd = {
        account: par.uanme,
        userGroup: par.group,
        id: par.id
      }
      console.log(this.acountAdd)
    },
    async dataUpdata() {
      // 确定修改数据
      const data = await modifyUser(this.acountAdd)
      if (data.code === 0) {
        this.userList()
      }
      this.dialogVisible = false
    }
  },
  // 过滤器
  filters: {
    timeReset
  }
}
</script>

<style lang="scss" scoped>
.el-pagination {
  margin: 20px 0 10px;
}
</style>
