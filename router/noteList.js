const Router = require('koa-router');
const ControllerObj = require('../controller/index.js');
// const Common = require('../libs/common');

//  console.log(Common.getSData());

// //子路由1  笔记列表
// let NoteList = new Router();

// NoteList.get('/', async (ctx)=>{    
//     ctx.body = '我是笔记列表';
// })


/*缓存*/
// const NodeCache = require('node-cache');
// const myCache = new NodeCache();


module.exports = function(){

    let router = new Router();
    router.get('set',async (ctx)=>{
        ctx.session = {
          user_id: Math.random().toString(36).substr(2),
          count: 0
        }
        // ctx.body=ctx.req
        // myCache.mget(["myKey"],function(err,val){
        //     console.log("val:"+val)
        //     console.log(val)
        // });
         ctx.redirect(`/note/list`);
        
    })
    router.post('list',async ctx => {  
        let params = {...ctx.request.body};
        let list = await  ControllerObj.noteList(params);
        ctx.body = list;
    })  

    router.get('detail', async (ctx)=> {
        let params = {...ctx.query};
        ctx.body= await ControllerObj.noteDetail(params)
    })
    return router;
}