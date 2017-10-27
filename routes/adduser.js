var express = require('express');
var router = express.Router();

var db = require('../app');


function addNewUser(phone,name,email,password,gender,callback){

    db.DB.ref('/users/'+phone).once('value').then(function (snapshot) {
        if(!snapshot.val()){
            db.DB.ref('/users/'+phone).set({
                username:name,
                email:email,
                phone:phone,
                password:password,
                gender:gender
            });
            callback(1);
        }
        else{
            callback(0);
        }

    });



}

/* GET users listing. */
router.get('/', function(req, res, next) {

    var phone = req.query.phone;
    var pass = req.query.pass;
    var email = req.query.email;
    var name = req.query.name;
    var gender = req.query.gender;
    addNewUser(phone,name,email,pass,gender,function (status) {
        res.send({status:status});
    });

});

module.exports = router;
