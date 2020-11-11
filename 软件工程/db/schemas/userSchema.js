const Mongoose = require('../conn');

let Schema = Mongoose.Schema; 
let UserSchema = new Schema({    
    userId: {
    type: String,
    required: true,
    unique: true,
    },
    username:String,
    password:String,
    gender:{
        type:String,
        default:"female"
    },
    age:String,
    department: String,
    grade: String,//年级
    major:String,
    role:{
        type: String,
        default: '0'
    },
   
});
module.exports = UserSchema;