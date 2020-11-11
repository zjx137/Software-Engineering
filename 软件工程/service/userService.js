const User = require('../db/models/user');
//查
async function findAndValidUser(usr,psd) {
    try {
        let conditons={userId:usr,password:psd};
        const data =  await User.find(conditons).exec();
        let valid = Boolean(data.length);
        let res = { valid };
        return res;
    }
    catch(err) {
        throw new Error('error');
    }
}

async function FindAllUser(){
    try {
        const data =  await User.find({}).exec();
        // console.log(data);
        return data;
    }
    catch(err) {
        throw new Error('error')
    }
}
//增
async function addUser(data) {//注册
    let addvaild=" ";
    try {
        let user = new User({
            userId: data.userId,
            password: data.password,
            username: data.username,
            age: data.age,
            grade: data.grade,
            gender: data.gender,
            role: data.role,
            major: data.major,
            department: data.department
        });
        await User.find({userId:data.userId},function(err,data){
            if(!err){
                if(data.length!=0){
                    console.log("用户已存在");
                    addvaild=false;
                }else{
                    user.save();
                    addvaild=true;
                }
            }
        })
        
    }
    catch(error) {
        throw new Error('创建失败')
    }
    console.log("addvaild="+addvaild);
    return  addvaild;
    
}
//删
async function DeleteUser(usr) {//参数是用户ID
    let DelVaild='';
    try {
         await User.deleteOne({userId:usr},function(err){
            if(!err){
                console.log("del-sucess");
                DelVaild=true;
                return DelVaild;
            }else{
                DelVaild=false;
            }
        })
    }
    catch(error) {
        throw new Error('删除失败');
    }
    console.log("DelVaild="+DelVaild)
    return DelVaild;
}
//改
async function UpdateUser(upUser) {//修改,参数是个Json
// {userId,password,username,age,birthday,grade,gender,phone,address};
    var UpdVaild=false;
    try {
        if(upUser.password!=''){
           await User.updateOne({userId:upUser.userId},{$set:{password:upUser.password}},function(err){//修改密码
                if(!err){
                    console.log("psd-upd-sucess")
                    UpdVaild=true;
                }else{
                    UpdVaild=false;
                }
            })
        }else{
            await User.updateOne({userId:upUser.userId},{$set:{username:upUser.username,age:upUser.age,department:upUser.department,grade:upUser.grade,gender:upUser.gender,role:upUser.role,major:upUser.major}},function(err){
                if(!err){
                    console.log("upd-sucess")
                    UpdVaild=true;
                }
            })
        }
    }
    catch(error) {
        throw new Error('信息修改失败');
    }
    console.log("UpdVaild="+UpdVaild);
    return UpdVaild;
}

async function findUser(userId){
    console.log(userId)
    return await User.findOne({userId});
}


let userService = {
    findAndValidUser,
    FindAllUser,//查询所有用户
    addUser,
    DeleteUser,
    UpdateUser,
    findUser
}


//findUser('admin','admin')
module.exports = userService;