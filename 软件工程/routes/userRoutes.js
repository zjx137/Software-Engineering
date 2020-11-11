const Router = require('koa-router');
const userService = require('../service/userService');
const createResponse = require('../utils/response');
const fs=require('promise-fs');
const { request } = require('http');

const userRoutes = new Router();

userRoutes
    .get('/',async(ctx,next)=>{//进入页面
        let data=await fs.readFile('./test.html');
        ctx.body=data.toString();
    })
    .get('/getUser',async (ctx)=>{
        const userId = ctx.request.query.userId;
        const data = await userService.findUser(userId);
        createResponse({
            ctx,
            data,
            status: 200,
        })
    })
    //登录
    .post('/login',async(ctx,next)=>{
        //登录判断
        let userdata = await userService.findAndValidUser(ctx.request.body.username,ctx.request.body.password);
        // console.log("userdata:"+userdata);
        // console.log(userdata.valid);
        const userId = ctx.request.body.username;
        
        if(!userdata.valid){
            ctx.body = '该用户不存在';
            
            createResponse({
                ctx,
                message: "用户名或者密码错误",
                status: 400
            })         
        }else{
            const data = await userService.findUser(userId)
            createResponse({
                ctx,
                message: "login-sucess",
                data,
                status: 200
            })         
        }
    })

    //注册
    .post('/register',async(ctx,next)=>{
        const {userId,password,username,age,department,grade,gender,role,major} = ctx.request.body;
        //用户名已存在
        const data = {userId,password,username,age,department,grade,gender,role,major};
        const res = await userService.addUser(data);
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
    //查询到所有用户
    .get('/findAllUsers',async(ctx,next)=>{
        let data=await userService.FindAllUser();
        // console.log(allUser);
        if(data.length!=0){
            createResponse({
                ctx,
                data,
                message: "查询成功",
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
    //删除用户
    .get('/deleteUser',async(ctx,next)=>{
        const res = await userService.DeleteUser(ctx.request.query.userId);
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

    //修改用户信息
    .post('/update',async(ctx,next)=>{
        //console.log(ctx.request.body);
        let UpdMsg=ctx.request.body.UpdMsg;
        //console.log(UpdMsg);
        //UpdMsg=JSON.parse(UpdMsg);
        //console.log(UpdMsg);

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

module.exports = exports = userRoutes; 