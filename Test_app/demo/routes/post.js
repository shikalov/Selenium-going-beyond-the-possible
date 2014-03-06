var fs = require('fs');
var path = require('path');
exports.index = function(req, res){
    console.log(req.files);
    if(req.files && req.files.file && req.files.file.path){
        var imagePath = path.join('images',path.basename(req.files.file.path));
        return res.json({result:'ok',path:imagePath});
    }else{
        return res.json({result:'fail'});
    }
};