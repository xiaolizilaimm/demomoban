<template>
  <Card>
    <template #header>
      <h3>店铺管理</h3>
    </template>
    <template #content>
      <el-form
        :model="storeForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        size="mini"
      >
        <el-form-item label="店铺名称" prop="name">
          <el-input v-model="storeForm.name"></el-input>
        </el-form-item>
        <el-form-item label="店铺公告" prop="bulletin">
          <el-input type="textarea" v-model="storeForm.bulletin"></el-input>
        </el-form-item>
        <el-form-item label="店铺头像" required>
          <el-avatar
            v-if="storeForm.avatar"
            shape="square"
            :size="100"
            fit="fill"
            :src="imgUrl + storeForm.avatar"
          ></el-avatar>
        </el-form-item>
        <el-form-item label="店铺图片">
          <el-upload
            action="http://127.0.0.1:5000/shop/upload"
            list-type="picture-card"
            :file-list="storeForm.pics"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="storeForm.pics" alt />
          </el-dialog>
        </el-form-item>
        <el-form-item label="配送费" prop="deliveryPrice">
          <el-input v-model="storeForm.deliveryPrice"></el-input>
        </el-form-item>
        <el-form-item label="配送时间" prop="deliveryTime">
          <el-input v-model="storeForm.deliveryTime"></el-input>
        </el-form-item>
        <el-form-item label="配送描述" prop="description">
          <el-input v-model="storeForm.description"></el-input>
        </el-form-item>
        <el-form-item label="店铺评分" prop="score">
          <el-input v-model="storeForm.score"></el-input>
        </el-form-item>
        <el-form-item label="销量" prop="sellCount">
          <el-input v-model="storeForm.sellCount"></el-input>
        </el-form-item>
        <el-form-item label="活动" prop="supports">
          <el-checkbox-group v-model="storeForm.supports">
            <el-checkbox label="在线支付28减5" name="type"></el-checkbox>
            <el-checkbox label="VC无限橙果汁全场8折" name="type"></el-checkbox>
            <el-checkbox label="单人精彩套餐" name="type"></el-checkbox>
            <el-checkbox label="特价饮品8折抢购" name="type"></el-checkbox>
            <el-checkbox label="单人特色套餐" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="营业时间" required>
          <el-date-picker
            v-model="storeForm.date"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </template>
  </Card>
</template>

<script>
import Card from '@/components/panel'
import _ from 'lodash'
import { getShopInfo, shopEdit } from '@/api/store'
export default {
  components: {
    Card
  },
  data() {
    return {
      storeForm: {
        id: '',
        name: '',
        bulletin: '',
        avatar: '',
        deliveryPrice: '',
        deliveryTime: '',
        description: '',
        score: '',
        sellCount: '',
        supports: [],
        pics: [],
        date: [],
        minPrice: ''
      },
      rules: {
        name: [{ required: true, message: '请输入店铺名称', trigger: 'blur' }],
        bulletin: [
          { required: true, message: '请输入店铺公告', trigger: 'blur' }
        ],
        avatar: [
          { required: true, message: '请输入店铺头像', trigger: 'blur' }
        ],
        deliveryPrice: [
          { required: true, message: '请输入店铺图片', trigger: 'blur' }
        ],
        deliveryTime: [
          { required: true, message: '请输入配送费', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入配送时间', trigger: 'blur' }
        ],
        score: [{ required: true, message: '请输入配送描述', trigger: 'blur' }],
        sellCount: [
          { required: true, message: '请输入店铺评分', trigger: 'blur' }
        ],
        supports: [{ required: true, message: '请输入销量', trigger: 'blur' }],
        pics: [{ required: true, message: '请输入活动', trigger: 'blur' }],
        date: [{ required: true, message: '请输入营业时间', trigger: 'blur' }]
      },
      dialogVisible: false,
      imgUrl: 'http://127.0.0.1:5000/upload/shop/'
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      const { data } = await getShopInfo()

      if (!Array.isArray(data.pics)) {
        data.pics = [data.pics]
      }
      this.storeForm = data
      // const arr = []
      // data.pics.forEach((item) => {
      //   arr.push({
      //     name: item,
      //     url: this.imgUrl + item
      //   })
      // })
      // console.log(arr)
      // this.storeForm.pics = arr
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          console.log(this.storeForm)
          const obj = _.cloneDeep(this.storeForm)
          obj.pics = JSON.stringify(obj.pics)
          obj.supports = JSON.stringify(obj.supports)
          obj.date = JSON.stringify(obj.date)

          const data = await shopEdit(obj)
          // console.log(data)
          if (data.code === 0) {
            // this.getData()
          }
        } else {
          this.$message.error('验证失败')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleRemove(file) {
      console.log(file)
    },
    handlePictureCardPreview(file) {
      this.storeForm.pics = file.url
      this.dialogVisible = true
      console.log(file.url)
    },
    handleSuccess(res, file) {
      console.log(res)
      this.storeForm.pics.push({
        name: res.imgUrl,
        url: this.imgUrl + res.imgUrl
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-input {
  width: 400px;
}
/deep/textarea {
  width: 400px;
  height: 200px;
  resize: none;
}
.el-form-item {
  width: 600px;
}
</style>
