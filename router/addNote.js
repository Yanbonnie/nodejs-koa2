const Router = require('koa-router');
const ControllerObj = require('../controller/index.js');
// const Meta = require('../libs/meta');
module.exports = function(){
    //子路由2  操作
    let router = new Router();
    //新增笔记
    router.post('add', async (ctx) => {   //ctx.request.body;
        let params = {...ctx.request.body,postime:parseInt(new Date().getTime() / 1000)};
        let data = await ControllerObj.addNote(params);      
        ctx.body = data;
    })
    //编辑笔记
    router.post('edit',async (ctx) => {
        let params = {...ctx.request.body,postime:parseInt(new Date().getTime() / 1000)};
        let data = await ControllerObj.editNote(params);
        ctx.body = data;
    })
    //删除笔记
    router.post('del',async (ctx)=>{
        let data = await ControllerObj.delNote(ctx.request.body);
        ctx.body = data;
    })
    return router;
}