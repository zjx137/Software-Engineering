<template>
  <div class="main">
    <div class="search-wrapper">
      <div style="margin-top: 15px; padding: 0 10px;">
        <el-input
          placeholder="请输入内容"
          v-model="search"
          class="input-with-select"
        >
          <el-select v-model="select" style="width:100px;" slot="prepend" placeholder="请选择">
            <el-option label="学号" value="1"></el-option>
            <el-option label="姓名" value="2"></el-option>
            <el-option label="学院" value="3"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="searchInfo()"></el-button>
        </el-input>
      </div>
    </div>
    <el-table :data="list" style="100%">
      <el-table-column prop="userId" label="学号/工号"> </el-table-column>
      <el-table-column prop="password" label="密码"> </el-table-column>
      <el-table-column prop="username" label="姓名"> </el-table-column>
      <el-table-column prop="gender" label="性别"> </el-table-column>
      <el-table-column prop="age" label="年龄"> </el-table-column>
      <el-table-column prop="department" label="所属学院"> </el-table-column>
      <el-table-column prop="grade" label="年级"> </el-table-column>
      <el-table-column prop="major" label="专业"> </el-table-column>
      <el-table-column prop="role" label="权限"> </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="changeRow(scope.$index)"
            type="text"
            size="small"
          >
            修改
          </el-button>
          <el-button
            @click.native.prevent="deleteRow(scope.$index)"
            type="text"
            size="small"
          >
            删除
          </el-button>
          <el-button
            @click.native.prevent="resetRow(scope.$index)"
            type="text"
            size="small"
          >
            重置密码
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="dialog-wrapper">
      <el-dialog
        title="修改信息"
        :visible.sync="dialogVisible"
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
          <span style="margin-right: 20px">密码: </span
          ><el-input
            v-model="obj.password"
            style="width: 355px"
            :disabled="true"
          ></el-input>
        </div>
        <div class="item-wrapper">
          <span style="margin-right: 20px">姓名: </span
          ><el-input v-model="obj.username" style="width: 355px"></el-input>
        </div>
        <div class="item-wrapper">
          <span style="margin-right: 20px">性别: </span
          ><el-input v-model="obj.gender" style="width: 355px"></el-input>
        </div>
        <div class="item-wrapper">
          <span style="margin-right: 20px">年龄: </span
          ><el-input v-model="obj.age" style="width: 355px"></el-input>
        </div>
        <div class="item-wrapper">
          <span style="margin-right: 20px">所属学院: </span
          ><el-input v-model="obj.department" style="width: 328px"></el-input>
        </div>
        <div class="item-wrapper">
          <span style="margin-right: 20px">年级: </span
          ><el-input v-model="obj.grade" style="width: 355px"></el-input>
        </div>
        <div class="item-wrapper">
          <span style="margin-right: 20px">专业: </span
          ><el-input v-model="obj.major" style="width: 355px"></el-input>
        </div>
        <div class="item-wrapper">
          <span style="margin-right: 20px">权限: </span
          ><el-input v-model="obj.role" style="width: 355px"></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="doChange()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import axios from "@/utils/axios";

export default {
  data() {
    return {
      list: [],
      dialogVisible: false,
      obj: {},
      search: '',
      select: '1',
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    getUserList() {
      axios
        .request({
          url: "/findAllUsers",
          method: "get",
        })
        .then((res) => {
          this.list = res.data.data;
          console.log(this.list);
        });
    },
    changeRow(index) {
      //console.log(this.list[index])
      this.dialogVisible = true;
      this.obj = this.list[index];
    },
    deleteRow(index) {
      console.log(this.list[index].userId);
      const userId = this.list[index].userId;
      axios
        .request({
          url: "/deleteUser",
          method: "get",
          params: {
            userId,
          },
        })
        .then((res) => {
          if (res.data.status == 200) {
            this.$message.success(res.data.message);
            this.list.splice(index, 1);
          } else {
            this.$message.error(res.data.message);
          }
        });
    },
    doChange() {
      let UpdMsg = this.obj;
      let pre_pass = UpdMsg.password
      UpdMsg.password = "";
      const data = {
        UpdMsg,
      };
      console.log(data);
      axios
        .request({
          url: "/update",
          method: "post",
          data,
        })
        .then((res) => {
          if (res.data.status == 200) {
            this.$message.success(res.data.message);
            this.dialogVisible = false;
            this.obj.password = pre_pass
          } else {
            this.$message.error(res.data.message);
          }
        });
    },
    resetRow(index) {
      let UpdMsg = {
        userId: this.list[index].userId,
        password: "123456",
      };
      const data = {
        UpdMsg,
      };
      axios
        .request({
          url: "/update",
          method: "post",
          data,
        })
        .then((res) => {
          if (res.data.status == 200) {
            this.$message.success(res.data.message);
            this.dialogVisible = false;
            this.list[index].password = "123456";
          } else {
            this.$message.error(res.data.message);
          }
        });
    },
    searchInfo() {
        //console.log(this.search)
        //console.log(this.select)
        const type = this.select
        const key = this.search
        if(key == ''){
            location.reload()
        }

        if(type == 1){
            let list = []
            for(let i=0;i<this.list.length;i++){
                if(this.list[i].userId == key)
                    list.push(this.list[i])
            }
            //console.log(list)
            this.list = list
        }
        else if(type == 2){
            let list = []
            for(let i=0;i<this.list.length;i++){
                if(this.list[i].username == key)
                    list.push(this.list[i])
            }
            this.list = list
        }
        else if(type == 3){
            let list = []
            for(let i=0;i<this.list.length;i++){
                if(this.list[i].department == key)
                    list.push(this.list[i])
            }
            this.list = list
        }
        
    }
  },
};
</script>

<style scoped>
.item-wrapper {
  margin-bottom: 20px;
}
</style>