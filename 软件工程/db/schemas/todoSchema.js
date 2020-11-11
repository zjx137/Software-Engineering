const mongoose = require('../conn');

let Schema = mongoose.Schema;
let todoSchema = new Schema({
    userId:{
        type: String,
        ref: 'users'
    },
    username:String,
    teacher: String,
    semester:String,//学期
    credit: String,//学分
    period: String,//学时
    course: String,//成绩
    score:String,//总分

});

module.exports = todoSchema;