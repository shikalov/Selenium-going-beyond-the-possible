 var fileSystem = require('fs'),path = require('path');
	
exports.get = function(req, res) {
    var filePath = path.join(__dirname, '../public/templates/'+req.params.template);
    var stat = fileSystem.statSync(filePath);
    console.log('request');
	if(stat.size){
        setTimeout(function(){
            console.log('responce');
            res.writeHead(200, {
                'Content-Length': stat.size
            });
            var readStream = fileSystem.createReadStream(filePath);
            readStream.pipe(res);
        },1000);
	}else{
        return next(new HttpError(404, 'Not found'));
	}	    
};