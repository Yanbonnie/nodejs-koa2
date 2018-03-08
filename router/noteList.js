const Router = require('koa-router');
const ControllerObj = require('../controller/index.js');

// //子路由1  笔记列表
// let NoteList = new Router();

// NoteList.get('/', async (ctx)=>{    
//     ctx.body = '我是笔记列表';
// })

module.exports = function(){

    let router = new Router();

    router.get('/list', async (ctx)=>{  
        let list = await  ControllerObj.noteList();
        ctx.body = list;
    })

    router.get('/detail', async (ctx)=> {
        let params = {...ctx.query};
        ctx.body= await ControllerObj.noteDetail(params)
    })
    return router;
}