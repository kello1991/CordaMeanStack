/**
 * Created by kello on 11/04/2017.
 */
var jwt = require('jsonwebtoken');
module.exports.authenticate=function(req,res,next){
    var headerExist= req.header.Authorization;
    console.log(req.header.authorization);
    if(headerExist){
        var token = req.header.authorization.split(' ')[1];
        jwt.verify(token,'s3cr3t',function (err,decoded) {
            if (err){
                console.log(err);
            }
            else {
                req.bank= decoded.username;
                console.log(decoded.username);
                next();
            }
        });
    }else {
        res.status(403).json("No Token founded ");
    }
}