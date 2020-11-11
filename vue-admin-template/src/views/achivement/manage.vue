<template>
  <div class="main">
    <div class="search-wrapper">
      <div style="margin-top: 15px; padding: 0 10px">
        <el-input
          placeholder="请输入内容"
          v-model="search1"
          class="input-with-select"
          style="width: 50%"
        >
          <el-select
            v-model="select1"
            style="width: 100px"
            slot="prepend"
            placeholder="请选择"
          >
            <el-option label="学号" value="1"></el-option>
            <el-option label="姓名" value="2"></el-option>
            <el-option label="任课老师" value="3"></el-option>
          </el-select>
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="searchInfo1()"
          ></el-button>
        </el-input>
        <el-input
          placeholder="请输入内容"
          v-model="search2"
          class="input-with-select"
          style="width: 48%; margin-left: 20px"
        >
          <el-select
            v-model="select2"
            style="width: 100px"
            slot="prepend"
            placeholder="请选择"
          >
            <el-option label="课程" value="1"></el-option>
            <el-option label="学期" value="2"></el-option>
          </el-select>
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="searchInfo2()"
          ></el-button>
        </el-input>
      </div>
    </div>
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="userId" label="学号"></el-table-column>
      <el-table-column prop="username" label="姓名"></el-table-column>
      <el-table-column prop="semester" label="学期"></el-table-column>
      <el-table-column prop="course" label="课程"></el-table-column>
      <el-table-column prop="teacher" label="任课老师"></el-table-column>
      <el-table-column prop="credit" label="学分"></el-table-column>
      <el-table-column prop="period" label="学时"></el-table-column>
      <el-table-column prop="score" label="课程成绩"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="changeAch(scope.$index)"
            >修改</el-button
          >
          <el-button type="text" size="small" @click="deleteAch(scope.$index)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="dialog-wrapper">
      <el-dialog
        title="修改信息"
        :visible.sync="dialogVisible2"
        width="30%"
        :modal="false"
        top="8vh"
      >
        <div class="item-wrapper">
          <span style="margin-right: 20px">学号: </span
          ><el-input
            v-model="obj.userId"
            style="width: 355px"
            :disabled="true"
          ></el-input>
        </div>
        <div class="item-wrapper">
          <span style="margin-right: 20px">课程: </span
          ><el-input
            v-model="obj.course"
            style="width: 355px"
            :disabled="true"
          ></el-input>
        </div>
        <div class="item-wrapper">
          <span style="margin-right: 20px">姓名: </span
          ><el-input v-model="obj.username" style="width: 355px"></el-input>
        </div>
        <div class="item-wrapper">
          <span style="margin-right: 20px">学期: </span
          ><el-input v-model="obj.semester" style="width: 355px"></el-input>
        </div>
        <div class="item-wrapper">
          <span style="margin-right: 20px">学分: </span
          ><el-input v-model="obj.credit" style="width: 355px"></el-input>
        </div>
        <div class="item-wrapper">
          <span style="margin-right: 20px">学时: </span
          ><el-input v-model="obj.period" style="width: 328px"></el-input>
        </div>
        <div class="item-wrapper">
          <span style="margin-right: 20px">授课老师: </span
          ><el-input v-model="obj.teacher" style="width: 355px"></el-input>
        </div>
        <div class="item-wrapper">
          <span style="margin-right: 20px">课程成绩: </span
          ><el-input v-model="obj.score" style="width: 355px"></el-input>
        </div>
    
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="doChange()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="add-wrapper">
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="dialogVisible = true"
        circle
        class="add-btn"
      ></el-button>
    </div>
    <el-dialog
      title="新增成绩"
      :visible.sync="dialogVisible"
      width="40%"
      top="1vh"
    >
      <el-form :model="form">
        <el-form-item label="学号">
          <el-input v-model="form.userId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="课程">
          <el-input v-model="form.course" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="授课老师">
          <el-input v-model="form.teacher" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学期">
          <el-input v-model="form.semester" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学分">
          <el-input v-model="form.credit" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学时">
          <el-input v-model="form.period" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="课程成绩">
          <el-input v-model="form.score" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "@/utils/axios";
export default {
  data() {
    return {
      list: [],
      search1: "",
      search2: "",
      select1: "1",
      select2: "1",
      dialogVisible: false,
      dialogVisible2: false,
      obj: {},
      form: {
        score: "0",
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    changeAch(index) {
        this.dialogVisible2 = true
        this.obj = this.list[index]
    },
    doChange(){
        let UserMsg = this.obj
        let data = {
            UserMsg
        }
        console.log(data)
        axios.request({
            url:'/updMsg',
            method: 'post',
            data
        }).then(res=>{
            if(res.data.status == 200){
                this.$message.success('修改成功')
                this.dialogVisible2 = false
            }
            else {
                this.$message.error('修改失败')
            }
        })
    },
    deleteAch(index) {
      console.log(this.list[index]);
      const { course, userId } = this.list[index];
      axios
        .request({
          url: "/delMsg",
          method: "get",
          params: {
            course,
            userId,
          },
        })
        .then((res) => {
          if (res.data.status == 200) {
            this.$message.success("删除成功");
            this.list.splice(index, 1);
          } else {
            this.$message.error("删除失败");
          }
        });
    },
    getList() {
      axios
        .request({
          url: "/getAllMsgs",
          method: "get",
        })
        .then((res) => {
          this.list = res.data.data;
          //console.log(this.list)
        });
    },
    searchInfo1() {
      const type = this.select1;
      const key = this.search1;
      if (key == "") {
        location.reload();
      }
      if (type == 1) {
        let list = [];
        for (let i = 0; i < this.list.length; i++) {
          if (this.list[i].userId == key) list.push(this.list[i]);
        }
        //console.log(list)
        this.list = list;
      } else if (type == 2) {
        let list = [];
        for (let i = 0; i < this.list.length; i++) {
          if (this.list[i].username == key) list.push(this.list[i]);
        }
        this.list = list;
      } else if (type == 3) {
        let list = [];
        for (let i = 0; i < this.list.length; i++) {
          if (this.list[i].teacher == key) list.push(this.list[i]);
        }
        this.list = list;
      }
    },
    searchInfo2() {
      const type = this.select2;
      const key = this.search2;
      if (key == "") {
        location.reload();
      }
      if (type == 1) {
        let list = [];
        for (let i = 0; i < this.list.length; i++) {
          if (this.list[i].course == key) list.push(this.list[i]);
        }
        //console.log(list)
        this.list = list;
      } else if (type == 2) {
        let list = [];
        for (let i = 0; i < this.list.length; i++) {
          if (this.list[i].semester == key) list.push(this.list[i]);
        }
        this.list = list;
      }
    },
    submit() {
      //console.log(this.form)
      const data = {
        UserMsg: this.form,
      };
      axios
        .request({
          url: "/addMsg",
          method: "post",
          data,
        })
        .then((res) => {
          if (res.data.status == 200) {
            this.$message.success("新增成功");
            this.list.push(this.form);
            this.dialogVisible = false;
          } else {
            this.$message.error("新增失败");
          }
        });
    },
  },
};
</script>

<style scoped>
.item-wrapper {
  margin-bottom: 20px;
}
.add-btn {
  display: block;
  position: absolute;
  bottom: 100px;
  right: 92px;
}
</style>