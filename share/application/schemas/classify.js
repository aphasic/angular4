var mongoose = require('mongoose');
var ClassifySchema = new mongoose.Schema({
    name :  {                                    //分类名称
        type: String,
        required: true
    },           
    parentid: {                                    //上级分类id
        type : String,
        required: true
    },
});



ClassifySchema.statics = {
    fetch : function (callback) {
        return this.find({}).exec(callback);
    },
    findByParent : function (parentid, callback) {
        return this.find({ parentid }).exec(callback);
    }
};

module.exports = ClassifySchema;