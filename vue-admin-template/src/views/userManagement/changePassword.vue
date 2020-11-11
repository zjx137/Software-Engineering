<template>
  <div class="main">
      <div class="form">
          <p style="color:#303133;font-size: 18px">学号：{{ userId }}</p>
          <el-input v-model="password" placeholder="请输入修改后的密码"></el-input>
          <el-button type="primary" @click="changePassword()" style="margin-top: 20px;display:block;">确认</el-button>
      </div>

  </div>
</template>

<script>
import axios from '@/utils/axios'

export default {
    data() {
        return {
            userId: localStorage.getItem('userId'),
            password: ''
        }
    },
    methods: {
        changePassword() {
            if(this.password != ''){
                let data = {
                    'UpdMsg': {
                        userId: this.userId,
                        password: this.password
                    }
                    
                }
                axios.request({
                    url: '/update',
                    method: 'post',
                    data
                }).then(res => {
                    console.log(res)
                    if(res.data.status == 200){
                        this.$message.success(res.data.message)
                    }
                })
            }
            else {
                this.$message.error('密码不能为空')
            }
            
        }
    }
}
</script>

<style lang="scss" scoped>
.form {
    width: 400px;
    display: block;
    margin-top: 32px;
    margin-left: 57px;
}
</style>