<template>
  <Card>
    <template #header>
      <h3>商品添加</h3>
    </template>
    <template #content>
      <el-form
        :model="goodsList"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        size="small"
      >
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="goodsList.name" placeholder="商品名称"></el-input>
        </el-form-item>
        <el-form-item label="商品分类" prop="category">
          <el-select v-model="goodsList.category" placeholder="请选择商品分类">
            <el-option
              v-for="item in goodsClassfy"
              :key="item.id"
              :label="item.cateName"
              :value="item.cateName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input-number v-model="goodsList.price" :min="0" label="描述文字" :precision="2"></el-input-number>
        </el-form-item>
        <el-form-item label="商品图片">
          <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1:5000/goods/goods_img_upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品描述" prop="goodsDesc">
          <el-input type="textarea" rows="8" v-model="goodsList.goodsDesc" class="textbox"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">添加商品</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </template>
  </Card>
</template>

<script>
import Card from '@/components/panel'
import { goodsCategories, goodsAdd } from '@/api/product'
export default {
  components: {
    Card
  },
  data() {
    return {
      goodsList: {
        name: '',
        category: '',
        price: 1,
        goodsDesc: ''
      },
      rules: {
        name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        category: [
          { required: true, message: '请选择商品分类', trigger: 'change' }
        ],
        goodsDesc: [
          { required: true, message: '请填写商品描述', trigger: 'blur' }
        ]
      },
      imageUrl: '',
      upImgUrl: '',
      goodsClassfy: {}
    }
  },
  created() {
    this.calssfyList()
  },
  methods: {
    // 商品添加
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const data = await goodsAdd({
            name: this.goodsList.name,
            category: this.goodsList.category,
            price: this.goodsList.price,
            imgUrl: this.upImgUrl,
            goodsDesc: this.goodsList.goodsDesc
          })
          if (data.code === 0) {
            this.$refs[formName].resetFields()
            this.imageUrl = ''
            this.$router.push('/product/index')
          }
        } else {
          this.$message.error('添加失败!')
          return false
        }
      })
    },
    // 重置表格
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.imageUrl = ''
    },
    // 图片展示
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      // 上传到数据库的
      this.upImgUrl = res.imgUrl
    },
    // 图片验证
    beforeAvatarUpload(file) {
      const arr = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']
      const isJPG = arr.includes(file.type)
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 商品分类渲染
    async calssfyList() {
      const { categories } = await goodsCategories()
      this.goodsClassfy = categories
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.el-input {
  width: 400px;
}
/deep/.textbox textarea {
  width: 400px;
  resize: none;
}
</style>
