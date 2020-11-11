<template>
  <div class="main">
    <div class="gpa-wrapper">
      <el-card class="box-card gpa-box">
        <p class="gpa-text">{{ gpa }}</p>
        <p style="font-size: 14px; text-align: center">绩点</p>
        <el-dropdown @command="handleCommand" class="semester-select">
          <span class="el-dropdown-link">
            选择学期<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="大一上">大一上</el-dropdown-item>
            <el-dropdown-item command="大一下">大一下</el-dropdown-item>
            <el-dropdown-item command="大二上" divided>大二上</el-dropdown-item>
            <el-dropdown-item command="大二下">大二下</el-dropdown-item>
            <el-dropdown-item command="大三上" divided>大三上</el-dropdown-item>
            <el-dropdown-item command="大三下">大三下</el-dropdown-item>
            <el-dropdown-item command="大四上" divided>大四上</el-dropdown-item>
            <el-dropdown-item command="大四下">大四下</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-card>
    </div>
    <div class="table-wrapper">
        <el-table
        :data="list"
        style="width:90%;display:block;margin: 0 auto;"
        
        >
        <el-table-column
        prop="semester"
        label="学期"
        >
        </el-table-column>
        <el-table-column
        prop="course"
        label="课程"
        >
        </el-table-column>
        <el-table-column
        prop="teacher"
        label="授课老师"
        >
        </el-table-column>
        <el-table-column
        prop="credit"
        label="学分"
        >
        </el-table-column>
        <el-table-column
        prop="period"
        label="学时"
        >
        </el-table-column>
        <el-table-column
        prop="score"
        label="课程成绩"
        sortable
        >
        </el-table-column>
        
        </el-table>
    </div>
  </div>
</template>

<script>
import axios from "@/utils/axios";
import { getList } from '@/api/table';
export default {
  data() {
    return {
      gpa: 3.82,
      list: [],
      back_list: [],
      semester: '大一上',
      userId: localStorage.getItem('userId'),
    };
  },
  created() {
      this.getList('')
  },
  methods: {
      handleCommand(key){
          this.semester = key
          //console.log(key)
          this.getList(key)
      },
      getList(key){
          if(key==''){
              axios.request({
                  url:'/getMsg',
                  method: 'get',
                  params: {
                      userId: this.userId
                  }
              }).then(res=>{
                  //console.log(res.data)
                  this.list = res.data.data
                  this.back_list = this.list
                  //console.log(this.list)
                  this.calculateGPA()
              })
          }
          else {
              let list = []
              for(let i=0;i<this.back_list.length;i++){
                  if(this.back_list[i].semester == key){
                      list.push(this.back_list[i])
                  }
              }
              this.list = list
              this.calculateGPA()
          }
          
      },
      calculateGPA(){
          let res = 0
          let credits = 0
          for(let i=0;i<this.list.length;i++){
              res += Number(this.list[i].credit * this.list[i].score)
              //console.log(res)
              credits += Number(this.list[i].credit)
              //console.log(credits)
          }
          res = res/credits
          //console.log(res)
          this.gpa = (res/10 - 5).toFixed(3)
      }
  },
};
</script>

<style scoped>
.item-wrapper {
  margin-bottom: 20px;
}
.gpa-box {
  display: block;
  margin: 20px auto;
  width: 500px;
}
.gpa-text {
  font-size: 40px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 10px;
  text-align: center;
}
.semester-select {
    position: relative;
    float: right;
    bottom: 112px;
}
</style>