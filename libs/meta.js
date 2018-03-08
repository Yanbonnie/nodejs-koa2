let meta = function(success=true,msg='ok',data=null,){
    return {
        "meta":{
            "success":success,
            "msg":msg
        },
        data
    }
}
module.exports = meta;