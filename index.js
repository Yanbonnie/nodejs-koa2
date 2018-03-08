const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const static = require('koa-static');
const path = require('path');

const server = new Koa();
server.use(bodyParser());

const staticPath = './pc';
server.use(static(
  path.join( __dirname,  staticPath)
))


//子路由1
let NoteList = require('./router/noteList')();

//子路由2  操作
let AddNote = require('./router/addNote')();

//装载所有字路由
let router = new Router();
router.use('/note',NoteList.routes(),NoteList.allowedMethods())
router.use('/handle/',AddNote.routes(),AddNote.allowedMethods())

//加载路由中间件
server.use(router.routes()).use(router.allowedMethods())

server.listen(8888)