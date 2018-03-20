const mysql = require('mysql');
const Meta = require('../libs/meta');
// const Config = require('../config/index.js');

// //连接池
// const db = mysql.createPool(Config.db);

const { queryDb } = require('./async-db');

module.exports = {
    //获取笔记列表
    async noteList(params){   
        params.pagesize = params.pagesize ? params.pagesize : 10;
        const curPage = (params.pagenum-1)*params.pagesize;
        let data = await queryDb(`SELECT * FROM note_table WHERE user_id = '${params.user_id}' ORDER BY ID DESC LIMIT ${curPage}, ${params.pagesize}`);
        return Meta(true,'ok',{list:data});
    },
    //获取笔记详情
    async noteDetail(params){
        if(!params.id){
             return Meta(false,'未知的笔记id');
        }
        let data = await queryDb(`SELECT * FROM note_table WHERE ID = ${params.id}`);
        return Meta(true,'ok',data);
    },
    //新增笔记
    async addNote(params){   
        //提交数据库之前做判断 
        if(!params.title){
            return Meta(false,'标题不能为空');
        }
        if(!params.context){
            return Meta(false,'内容不能为空');
        }
        //请求数据库
        let data = await queryDb(`INSERT INTO note_table (ID,title,context,postime,user_id) VALUES (0,'${params.title}', '${params.context}','${params.postime}','${params.user_id}');`);
        if(data.affectedRows > 0){
            return Meta();
        }else{
            return Meta(false,'error');
        }
        
    },
    //编辑笔记
    async editNote(params){
        if(!params.id){
            return Meta(false,'未知的笔记id');
        }
        if(!params.title){
            return Meta(false,'标题不能为空');
        }
        if(!params.context){
            return Meta(false,'内容不能为空');
        }
        //请求数据库
        let data = await queryDb(`UPDATE note_table SET title='${params.title}',context='${params.context}',postime='${params.postime}' WHERE ID=${params.id}`);
        if(data.affectedRows > 0){
            return Meta();
        }else{
            return Meta(false,'error');
        }
        return data;
    },
    //删除笔记
    async delNote(params){
        if(!params.id){
            return Meta(false,'未知的笔记id');
        }
        //请求数据库
        let data = await queryDb(`DELETE FROM note_table WHERE ID = "${params.id}"`);
        if(data.affectedRows > 0){
            return Meta();
        }else{
            return Meta(false,'error');
        }
        return data;
    }
}
