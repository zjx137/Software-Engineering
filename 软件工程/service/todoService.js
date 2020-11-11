const Todo = require('../db/models/todo');
const user = require('../db/models/user');

//增
async function addTodo(userMsg) {//参数是一个对象
    let addvaild=false;
    try {
        const todo = new Todo({
            userId:userMsg.userId,
            username:userMsg.username,//姓名
            teacher: userMsg.teacher,//年级
            semester:userMsg.semester,//学期
            credit: userMsg.credit,//学分
            period: userMsg.period,//学时
            course: userMsg.course,//课程成绩
            
            score:userMsg.score,//总分
            
        });
        console.log("todo="+todo)
        await Todo.find({userId:userMsg.userId,course:userMsg.course},function(err,data){
            if(!err){
                if(data.length!=0){
                    console.log("该记录已存在");
                }else{
                    console.log("addtodo-sucess");
                    todo.save();
                    addvaild=true;
                }
            }
        })
        // return await todo.save();
    } catch (error) {
        throw new Error('error');
    }
    console.log("addvaild="+addvaild)
    return addvaild;
}
//删
async function deleteTodo(userid,term) {//参数：学生学号，学期
    let delVaild=false;
    try {
        await Todo.deleteOne({userId:userid,course:term},(err)=>{
            if(!err){
                delVaild=true;
                console.log("deltodo-sucess");
            }else{
                console.log("deltodo-fail")
            }
        })
    
    } catch (error) {
        console.log("deltodo-fail")
        throw new Error('error');
    }
    return delVaild
}
//查
async function getTodo(userMsg) {//获得单个人的信息,参数是个Json,Json为{}时查询到所有人信息;userMsg的意思是 find的查询条件，从前端传来 
    try {
        console.log("findtodo-sucess");
        return await Todo.find({userId:userMsg}).exec();
    } catch (error) {
        console.log("findtodo-fail");
        throw new Error('error')
    }
    
}

async function getAll(){
    return await Todo.find({}).exec();
}

//改
async function updateTodoContent(userMsg) {//只能修改学分、学时、4门课的成绩、总成绩、绩点
    var UpdVaild=false;
    console.log("1="+userMsg)
    try {
        const conditions={userId:userMsg.userId,course:userMsg.course};
        const setData={
            period:userMsg.period,
            credit:userMsg.credit,
            score:userMsg.score,
            teacher: userMsg.teacher,
            semester: userMsg.semester,
            username: userMsg.username
        }
        await Todo.updateOne(conditions,{$set:setData},function(err){//修改密码
            if(!err){
                console.log("Msg-upd-sucess")
                UpdVaild=true;
            }else{
                UpdVaild=false;
            }
        })
    } catch (error) {
        console.log("updatetodo-fail");
        throw new Error('error')
    }
    //let result;
    // return await Todo.findByIdAndUpdate(todoId,{content},{useFindAndModify:false});
 
    return UpdVaild;
}

let todoService = {
    addTodo,
    deleteTodo,
    getTodo,
    updateTodoContent,
    getAll
}
module.exports = todoService;