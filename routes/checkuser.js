var express = require('express');
var router = express.Router();

var db = require('../app');

function checkUser(phone,pass,callback) {

    db.DB.ref('/users/'+phone).once('value').then(function (snapshot) {
        if(!snapshot.val()){
            callback(0,{});
        }
        var password = snapshot.val().password;
        if(password!=pass){
            callback(1,{});
        }
        else{
            callback(2,snapshot.val());
        }

    });
}

router.get('/',function (req,res,next) {
    var phone = req.query.phone;
    var pass = req.query.pass;
    checkUser(phone,pass,function(status,details){
        res.send({status:status,details:details});
    });



});

module.exports = router;