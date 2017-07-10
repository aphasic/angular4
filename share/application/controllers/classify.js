var mongoose = require('mongoose');
var Classify = mongoose.model('Classify');
var express = require('express');


//根据parentid获取分类
exports.getByParent = function (req, res) {
    var parentid = req.body.data;
    Classify.findByParent( parentid ,function (err, docs) {
        if(err){
            res.json({'err':1,'msg':'获取分类失败'});
        } else {
            res.json({'err':0,'msg':docs});
        }
    })
};

//data的结构是Classify[],不包括_id
exports.addClassify = function (req, res) {
    var data = req.body.data;
    var i = 0;
    var jsons = [];
    saveOne(data[0]);

    //因为save函数的回调是异步的，所以这里用递归控制进程
    function saveOne( item ) {
        if(i < data.length){
            let classify = new Classify();
            classify.name = item.name;
            classify.parentid = item.parentid;
            classify.save(function (err) {
                i++;
                if(err){
                    jsons.push({'err':1,'msg':'分类'+item.name+"添加失败！"});
                }
                else{
                    jsons.push({'err':0});
                }
                saveOne(data[i]);
            });
        }
        else{
            res.json(jsons);
        }
    }

};

//data的结构是string[]，_id组成的数组
exports.deleteClassify = function (req, res) {
    var data = req.body.data;
    Classify.remove({'_id': {$in: data}}, function (err) {
        if (err) {
            res.json({'err': 1, 'msg': '删除失败'});
        }
        else {
            res.json({'err': 0});
        }
    });
};


//     var i = 0;
//     var jsons = [];
//     deleteOne(data[0]);
//
//     //因为deleteOne函数的回调是异步的，所以这里用递归控制进程
//     function deleteOne( id ) {
//         if(i < data.length){
//            Classify.remove({ '_id':id } , function (err) {
//                 i++;
//                 if(err){
//                     jsons.push({'err':1,'msg':'删除失败'});
//                 }
//                 else{
//                     jsons.push({'err':0});
//                 }
//                 deleteOne(data[i]);
//             });
//         }
//         else{
//             res.json(jsons);
//         }
//     }
//
// };
//data的结构是Classify，包括_id
exports.editClassify = function (req, res) {
    var data = req.body.data;
    Classify.update( {'_id': data._id} ,{'name':data.name},function (err) {
        if(err){
            res.json({'err':1,'msg':'修改分类失败'});
        } else {
            res.json({'err':0});
        }
    })
};