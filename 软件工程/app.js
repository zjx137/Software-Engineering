const Koa = require('koa');
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const userRoutes = require('./routes/userRoutes');
const todoRoutes = require('./routes/todoRoutes');

const app = new Koa();
app.use(bodyParser());
app.use(cors());

app.use(userRoutes.routes());
app.use(todoRoutes.routes());

app.listen(7070,()=>{
    console.log('listen in http://localhost:7070')
})
