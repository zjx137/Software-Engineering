const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost/User',{useNewUrlParser:true,useUnifiedTopology:true});
const con = mongoose.connection;
con.on('error', err=>{
    console.log('conn error')
});
con.on('open',()=>{
    console.log('conn success');
});

module.exports = mongoose;
