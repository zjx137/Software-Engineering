const Koa=require('koa');
const Router=require('koa-router');
const Memorystream=require('memorystream');
const BodyParser=require('koa-bodyparser');
const fs=require('promise-fs');
const createResponse = require('./utils/response');
const { request } = require('http');

const userService = require('./service/userService');
const todoService=require('./service/todoService');

const server=new Koa();
const router=new Router();

server.listen(2313);
server.use(BodyParser());


router
    // .get('/',async(ctx,next)=>{//进入页面
    //     let data=await fs.readFile('./test.html');
    //     ctx.body=data.toString();
    // })
    .post('/login',async(ctx,next)=>{//登录
        //登录判断
        console.log(ctx.request.body);
        let userdata = await userService.findAndValidUser(ctx.request.body.user,ctx.request.body.pass);
        console.log("userdata:"+userdata);
        // console.log(userdata.valid);
        let allUser=await userService.FindAllUser();
        console.log(allUser);
        if(!userdata.valid){
            ctx.body = '该用户不存在';
            createResponse({
                ctx,
                message: "用户名或者密码错误",
                status: 400
            })         
        }else{
            createResponse({
                ctx,
                message: "login-sucess",
                status: 200
            })         
        }
    })

    .get('/register',async(ctx,next)=>{//注册
        console.log(ctx.query);
        //用户名已存在
        const res = await userService.addUser(ctx.query.user,ctx.query.pass);
        if(res){
            createResponse({
                ctx,
                message: "用户注册成功",
                status: 200
            })         
        }else{
            createResponse({
                ctx,
                message: "用户已存在",
                status: 400
            })    
        }

    })

    .get('/deleteUser',async(ctx,next)=>{//删除用户
        const res = await userService.DeleteUser(ctx.query.user);
        console.log(res);
        if(res){
            createResponse({
                ctx,
                message: "删除成功",
                status: 200
            })         
        }else{
            createResponse({
                ctx,
                message: "删除失败",
                status: 400
            })    
        }
        
    })

    .post('/update',async(ctx,next)=>{
        console.log(ctx.request.body);
        let UpdMsg=ctx.request.body.UpdMsg;
        console.log(UpdMsg);
        UpdMsg=JSON.parse(UpdMsg);
        console.log(UpdMsg);

        const res=await userService.UpdateUser(UpdMsg);
        console.log(res);
        if(res){
            createResponse({
                ctx,
                message: "修改成功",
                status: 200
            })         
        }else{
            createResponse({
                ctx,
                message: "修改失败",
                status: 400
            })    
        }
    })



    //成绩管理
        //增加
    .post('/addMsg',async(ctx,next)=>{
        // console.log("ctx.request.body="+JSON.stringify(ctx.request.body));
        let UserMsg=ctx.request.body.UpMsg;
        UserMsg=JSON.parse(UserMsg);
        const res=await todoService.addTodo(UserMsg);
        if(res){
            createResponse({
                ctx,
                message: "add-sucess",
                status: 200
            })         
        }else{
            createResponse({
                ctx,
                message: "add-fail 当前记录已存在",
                status: 400
            })        
        }
    })

        //查到所有
    .get('/getAllMsgs',async(ctx,next)=>{
        // const res=await todoService.getAllTodos();
        console.log(ctx.body)
        const data=await todoService.getTodo({});
        if(data){
            createResponse({
                ctx,
                data,
                message: "全部人成绩信息查询成功",
                status: 200
            })
        }else{
            createResponse({
                ctx,
                message: "成绩信息查询失败",
                status: 400
            })      
        }
    })
    //查到单个
    .get('/getMsg',async(ctx,next)=>{
        var userMsg=ctx.query.UpMsg;
        userMsg=JSON.parse(userMsg);
        console.log("upm="+typeof(userMsg) );
        const data=await todoService.getTodo(userMsg);
        if(data){
            createResponse({
                ctx,
                data,
                message: "个人成绩信息查询成功",
                status: 200
            })
        }else{
            createResponse({
                ctx,
                message: "成绩信息查询失败",
                status: 400
            })      
        }
    })
    //删除
    .get('/delMsg',async(ctx,next)=>{
        let todoid=ctx.query.user;
        let term=ctx.query.term;
        const res=await todoService.deleteTodo(todoid,term);
        if(res){
            createResponse({
                ctx,
                message: "删除成功",
                status: 200
            })         
        }else{
            createResponse({
                ctx,
                message: "删除失败",
                status: 400
            })    
        }
    })

    //修改
    .post('/updMsg',async(ctx,next)=>{
        let userMsg=ctx.request.body.UpMsg;
        userMsg=JSON.parse(userMsg);
        const res=await todoService.updateTodoContent(userMsg);
        if(res){
            createResponse({
                ctx,
                message: "成绩修改成功",
                status: 200
            })         
        }else{
            createResponse({
                ctx,
                message: "成绩修改失败",
                status: 400
            })    
        }
    })
    //打印成绩单
    .get('/stream',async(ctx,next)=>{
        // Username={userId:"leo2"};
        var Username=ctx.query.UpMsg;
        console.log(Username);
        Username=JSON.parse(Username);
        const UserData=await todoService.getTodo(Username);
        console.log(UserData)
        var username=UserData[0].username;
        let stream=new Memorystream();
        ctx.attachment(`${username}的成绩单.txt`);
        ctx.body=stream;
            stream.write(`导出人员:${UserData[0].userId}`);
            stream.write('\n');
            stream.write(`导出时间:${new Date().toLocaleString()}`);
            stream.write('\n');
            stream.write(`学生姓名:${UserData[0].username}`);
            stream.write('\n');
        for(var i=0;i<UserData.length;i++){
            stream.write(`年级:${UserData[i].grade}`);
            stream.write('\n');
            stream.write(`学期:${UserData[i].semester}`);
            stream.write('\n');
            stream.write(`学分:${UserData[i].Credit}`);
            stream.write('\n');
            stream.write(`学时:${UserData[i].Period}`);
            stream.write('\n');
            stream.write(`课程1成绩:${UserData[i].Course1}`);
            stream.write('\n');
            stream.write(`课程2成绩:${UserData[i].Course2}`);
            stream.write('\n');
            stream.write(`课程3成绩:${UserData[i].Course3}`);
            stream.write('\n');
            stream.write(`课程4成绩:${UserData[i].Course4}`);
            stream.write('\n');
            stream.write(`总成绩:${UserData[i].Scores}`);
            stream.write('\n');
            stream.write(`绩点:${UserData[i].GPA}`);
            stream.write('\n');
            stream.write('-------------------------------------');
            stream.write('\n');
        }
        stream.end();
    })

server.use(router.routes());

