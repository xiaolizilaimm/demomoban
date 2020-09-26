<template>
  <Card>
    <template #header>
      <h3>管理员信息</h3>
    </template>
    <template #content>
      <p>
        管理员ID:
        <span>{{userList.id}}</span>
      </p>
      <el-divider></el-divider>
      <p>
        账号:
        <span>{{userList.account}}</span>
      </p>
      <el-divider></el-divider>
      <p>
        用户组:
        <span>{{userList.userGroup}}</span>
      </p>
      <el-divider></el-divider>
      <p>
        创建时间:
        <span>{{userList.ctime | timeReset}}</span>
      </p>
      <el-divider></el-divider>
      <p class="img">
        管理员头像:
        <el-upload
          class="avatar-uploader"
          action="http://127.0.0.1:5000/users/avatar_upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </p>

      <el-button type="primary" style=" margin: 10px 0 0 95px" @click="upImg">上传头像</el-button>
    </template>
  </Card>
</template>

<script>
import Card from '@/components/panel/index'
import { userList, upDataImg } from '@/api/acount'
import { timeReset } from '@/filters'

export default {
  name: 'myCenter',
  components: {
    Card
  },
  filters: {
    timeReset
  },
  data() {
    return {
      userList: {},
      imageUrl: '',
      upImgUrl: ''
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      const { accountInfo } = await userList()
      this.userList = accountInfo
    },
    handleAvatarSuccess(res, file) {
      // 上传到服务器给用户展示用的
      this.imageUrl = URL.createObjectURL(file.raw)
      // 上传到数据库的
      this.upImgUrl = res.imgUrl
    },
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
    async upImg() {
      const data = await upDataImg({
        imgUrl: this.upImgUrl
      })
      console.log(data)
      if (data.code === 0) {
        // 刷新页面让头像刷新
        location.reload()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
h3 {
  font-weight: 700;
}
p {
  font-weight: 700;
}
span {
  margin-left: 10px;
  font-weight: 400;
}
.img {
  display: flex;
  align-items: center;
}
/deep/.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin-left: 10px;
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
</style>
