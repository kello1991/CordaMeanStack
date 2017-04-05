var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Bank = mongoose.model('bank');
var Client = mongoose.model('client');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('home.html');
    /**var newclient = {
        username:"client1",
        password:"client1",
        email:"client1",
        firstname:"client1",
        lastname:"client1",
        transactions:["client1","client1","client1"]

    };
     var dataClient = new Client(newclient);
     var  newbank = {
        corda_id:"NodeA",
        name:"NodeA",
        address:"NodeA",
        tel:"NodeA" ,
        clients:[
            {
                username:"dsaads",
                password:"sdas",
                email:"asasd",
                firstname:"asddas",
                lastname:"asda",
                transactions:["sda","asdda"]}
        ]

    };

     dataClient.lastname="fdjhkds";
     var data = new Bank(newbank);
     data.save(true,function (err) {
        console.log(err);
    });
     res.render('index');**/

});

module.exports = router;
