const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const static = require('koa-static');
const path = require('path');

/*cookis session*/
const Session = require('koa-session-minimal');
const MysqlSession = require('koa-mysql-session');
const redisStore = require('koa-redis')

/*缓存*/
const NodeCache = require('node-cache');
const myCache = new NodeCache();

/*自定义*/
const Config = require('./config');

const server = new Koa();
server.use(bodyParser());  

const staticPath = './pc';
server.use(static(
  path.join( __dirname,  staticPath)
))

server.use(Session({
    key:'SESSION_ID',
    store:new MysqlSession(Config.db),
    cookie:{
      maxAge: '', // cookie有效时长
      expires: '',  // cookie失效时间
      path: '', // 写cookie所在的路径
      domain: '', // 写cookie所在的域名
      httpOnly: '', // 是否只用于http请求中获取
      overwrite: '',  // 是否允许重写
      secure: '',
      sameSite: '',
      signed: '',
    }
}))
server.use(Session({
  store: redisStore()
}))


//子路由1
let NoteList = require('./router/noteList')();

//子路由2  操作
let AddNote = require('./router/addNote')();




//装载所有字路由
let router = new Router();

server.use(async (ctx, next) => {
  if(ctx.session.user_id || ctx.url == '/note/set'){  //已登录或者到了
    await next();
  }else{

    /*myCache.set('redirectUrl','456789',(err,success)=>{
      if( !err && success ){
        console.log('成功设置缓存')
        // true 
        ctx.redirect(`/note/set`);
      }
    })*/
    let succ = myCache.set('myKey',{a:1,b:2},10000);
    console.log('succ'+succ)
    if(succ){
      ctx.redirect(`/note/set`);
    }
    
    
  }
})

router.use('/note/',NoteList.routes(),NoteList.allowedMethods())
router.use('/handle/',AddNote.routes(),AddNote.allowedMethods())



//加载路由中间件
server.use(router.routes()).use(router.allowedMethods())

server.listen(8888)