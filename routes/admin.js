/**
 * Created by kello on 05/04/2017.
 */
var express = require('express');
var router = express.Router();
var bodyparser = require("body-parser");
var mongoose = require('mongoose');
var Bank = mongoose.model('bank');
var Transaction = mongoose.model('transaction');
var http = require("http");
var bycrypt = require("bcrypt-nodejs");
var jwt = require("jsonwebtoken");
var auth = require("./auth.js");
port = "";
url = "http://localhost:"+port+"/api/example/";
var bankId="";
//root route
router.get('/', function(req, res, next) {
    res.sendFile(req.app.get('admin_path') + 'index.html');
    console.log(req.path);
});

//get login page
router.get('/login', function(req, res, next) {
    res.sendFile(req.app.get('admin_path') + 'auth.html');
    console.log(req.path);
});

//get all transactions
router.get('/bank/transactions',function(req, res) {
    Bank.findById(bankId, function(err, bank) {
        if (err)
            res.send(err);
        res.json(bank.transactions);
    });
});

//add new node
router.post('/addbank', function (req, res, next) {

    var pass = bycrypt.hashSync(req.body.password,bycrypt.genSaltSync(10))


    var bank=  {
        _id:new mongoose.mongo.ObjectId(),
        corda_id: req.body.corda_id,
        name: req.body.name,
        address: req.body.address,
        port:req.body.port,
        tel: req.body.tel,
        username:req.body.username,
        password:pass,
        transactions:[]
    }

    var bankModel= new Bank(bank);
    bankModel.save(function(err){
        if (err){
            res.json(err);}
        else {
            res.json(bankModel._id);

        }});
});

//login
router.post('/login',function (req,res) {
    Bank.findOne({username:req.body.username},function (err,bank) {
        if(err){
            res.send(err);
        }
        if (!bank) {
            res.status(401).json("unauthorized");
        }
        else {
            if(bycrypt.compareSync(req.body.password,bank.password)){
                var token = jwt.sign(bank, 'superSecret');
                port=bank.port;
                bankId=bank._id;
                console.log("your id is "+bank._id);

                res.header("token", token);
                res.redirect("/admin");
            }else {
                res.json("");

            }
        }
    })

})

//get a bank
router.get('/bank/:bankId',function(req, res) {
    Bank.findById(req.params.bankId, function(err, bank) {

        if (err)
            res.send(err);
        res.json(bank);
    });
});

//get all the banks
router.get('/bank',function(req, res) {
    Bank.find(function(err, banks) {
        if (err)
            res.send(err);
        res.json(banks);
    });
});

//add transaction to bank
router.put('/bank/:bankId/:transaction/:type/:amount/:receiver/:sender/:quantity/:product',function(req, res) {
    Bank.findOne({"corda_id":req.params.bankId},function(err, bank) {
        var ligne = {
            idTran:req.params.transaction,
            type:req.params.type,
                amount:req.params.amount,
            receiver:req.params.receiver,
            sender:req.params.sender,
            date:new Date().toISOString().replace(/T/, ' '),
            quantity:req.params.quantity,
            product:req.params.product
        };
        if (ligne.quantity === undefined && ligne.product === undefined) {
            ligne.quantity = "--";
            ligne.product = "--";
        }
        console.log(ligne)
        bank.transactions.push(new Transaction(ligne));

        bank.save(function (err) {
            if(err){
                res.json(err)
            }else {
                res.json(bank)
            }
        });


    });
});

//update a bank
router.put('/bank/:bankId',function(req, res) {
    Bank.findById(req.params.bankId,function(err, bank) {
        bank.name=req.body.name;
        bank.address=req.body.address;
        bank.username= req.body.username;
        bank.password=req.body.password;
        bank.save(function (err) {
            if(err){
                res.json(err);
            }else {
                res.json(bank);
            }
        });
    });
});


//get the name of the Node
router.get('/me', function (req, res, next) {
    url = "http://localhost:"+port+"/api/example/";
    var demande = "me";
    url += demande;
    var request = http.get(url, function (response) {
        // data is streamed in chunks from the server
        // so we have to handle the "data" event
        var buffer = "",
            dataToGet,
            route;

        response.on("data", function (chunk) {
            buffer += chunk;
        });

        response.on("end", function (err) {
            // finished transferring data
            // dump the raw data
            console.log(buffer);
            console.log("\n");
            dataToGet = JSON.parse(buffer);
            if (err)
                res.json(err);
            res.json(dataToGet);
        });
    });
    url = "http://localhost:"+port+"/api/example/";
});

//get the peers
router.get('/peers', function (req, res, next) {
    url = "http://localhost:"+port+"/api/example/";
    var demande = "peers";
    url += demande;
    var request = http.get(url, function (response) {
        // data is streamed in chunks from the server
        // so we have to handle the "data" event
        var buffer = "",
            dataToGet,
            route;

        response.on("data", function (chunk) {
            buffer += chunk;
        });

        response.on("end", function (err) {
            // finished transferring data
            // dump the raw data
            console.log(buffer);
            console.log("\n");
            dataToGet = JSON.parse(buffer);
            if (err)
                res.json(err);
            res.json(dataToGet);
        });
    });
    url = "http://localhost:"+port+"/api/example/";
});

//get peer by name
router.get('/peers/:name', function (req, res, next) {
    url = "http://localhost:"+port+"/api/example/";
    var name = req.params.name;
    var demande = "peers/" + name;
    url += demande;
    var request = http.get(url, function (response) {
        // data is streamed in chunks from the server
        // so we have to handle the "data" event
        var buffer = "",
            dataToGet,
            route;

        response.on("data", function (chunk) {
            buffer += chunk;
        });

        response.on("end", function (err) {
            // finished transferring data
            // dump the raw data
            console.log(buffer);
            console.log("\n");
            dataToGet = JSON.parse(buffer);
            if (err)
                res.json(err);
            res.json(dataToGet);
        });
    });
    url = "http://localhost:"+port+"/api/example/";
});

//get all the issuers
router.get('/issuers', function (req, res, next) {
    url = "http://localhost:"+port+"/api/example/";
    var demande = "issuers";
    url += demande;
    var request = http.get(url, function (response) {
        // data is streamed in chunks from the server
        // so we have to handle the "data" event
        var buffer = "",
            dataToGet,
            route;

        response.on("data", function (chunk) {
            buffer += chunk;
        });

        response.on("end", function (err) {
            // finished transferring data
            // dump the raw data
            console.log(buffer);
            console.log("\n");
            dataToGet = JSON.parse(buffer);
            if (err)
                res.json(err);
            res.json(dataToGet);
        });
    });
    url = "http://localhost:"+port+"/api/example/";
});

//get all the notaries
router.get('/notaries', function (req, res, next) {
    url = "http://localhost:"+port+"/api/example/";
    var demande = "notaries";
    url += demande;
    var request = http.get(url, function (response) {
        // data is streamed in chunks from the server
        // so we have to handle the "data" event
        var buffer = "",
            dataToGet,
            route;

        console.log(response.data);

        response.on("data", function (chunk) {
            buffer += chunk;
        });

        response.on("end", function (err) {
            // finished transferring data
            // dump the raw data
            console.log(buffer);
            //dataToGet = JSON.parse(buffer);
            if (err)
                res.json(err);
            res.json(buffer);
        });
    });
    url = "http://localhost:"+port+"/api/example/";
});

//get notary by name
router.get('/notaries/:name', function (req, res, next) {
    url = "http://localhost:"+port+"/api/example/";
    var name = req.params.name;
    var demande = "notaries//" + name;
    url += demande;
    var request = http.get(url, function (response) {
        // data is streamed in chunks from the server
        // so we have to handle the "data" event
        var buffer = "",
            dataToGet,
            route;

        response.on("data", function (chunk) {
            buffer += chunk;
        });

        response.on("end", function (err) {
            if (err)
                res.json(err);
            else {
                // finished transferring data
                // dump the raw data
                console.log(buffer);
                console.log("\n");
                dataToGet = JSON.parse(buffer);

                res.json(dataToGet);
            }
        });
    });
    url = "http://localhost:"+port+"/api/example/";
});

//get the balance
router.get('/balance', function (req, res, next) {
    url = "http://localhost:"+port+"/api/example/";
    var demande = "balance";
    url += demande;
    var request = http.get(url, function (response) {
        // data is streamed in chunks from the server
        // so we have to handle the "data" event
        var buffer = "",
            dataToGet,
            route;

        response.on("data", function (chunk) {
            buffer += chunk;
        });

        response.on("end", function (err) {
            // finished transferring data
            // dump the raw data
            console.log(buffer);
            console.log("\n");
            dataToGet = JSON.parse(buffer);
            if (err)
                res.json(err);
            res.json(dataToGet);
        });
    });
    url = "http://localhost:"+port+"/api/example/";
});

//issue money to a peer
router.get('/issue/:peerName/:amount/:currency', function (req, res, next) {

    url = "http://localhost:"+port+"/api/example/";
    var peerName = req.params.peerName;
    var amout = req.params.amount;
    var currency = req.params.currency;
    console.log(peerName, amout);
    var demande = "issue/" + peerName + "/" + amout+"/"+currency;
    url += demande;
    var request = http.get(url, function (response) {
        // data is streamed in chunks from the server
        // so we have to handle the "data" event
        var buffer = "",
            dataToGet,
            route;

        response.on("data", function (chunk) {
            buffer += chunk;
        });

        response.on("end", function (err) {
            // finished transferring data
            // dump the raw data
            console.log(buffer);
            console.log("\n");
            //dataToGet = JSON.parse(buffer);
            if (err)
                res.json(err);
            res.json(buffer);
        });
    });
    url = "http://localhost:"+port+"/api/example/";
});

//Exchange money
router.get('/exchange/:peerName/:amount', function (req, res, next) {

    url = "http://localhost:"+port+"/api/example/";
    var peerName = req.params.peerName;
    var amout = req.params.amount;
    console.log(peerName, amout);
    var demande = "exchange/" + peerName + "/" + amout;
    url += demande;
    var request = http.get(url, function (response) {
        // data is streamed in chunks from the server
        // so we have to handle the "data" event
        var buffer = "",
            dataToGet,
            route;

        response.on("data", function (chunk) {
            buffer += chunk;
        });

        response.on("end", function (err) {
            // finished transferring data
            // dump the raw data
            console.log(buffer);
            console.log("\n");
            //dataToGet = JSON.parse(buffer);
            if (err)
                res.json(err);
            res.json(buffer);
        });
    });
    url = "http://localhost:"+port+"/api/example/";
});




//pay a peer
router.get('/pay/:peerName/:amount', function (req, res, next) {
    url = "http://localhost:"+port+"/api/example/";

    var peerName = req.params.peerName;
    var amout = req.params.amount;
    console.log(peerName, amout);
    var demande = "pay/" + peerName + "/" + amout;
    url += demande;
    var request = http.get(url, function (response) {
        // data is streamed in chunks from the server
        // so we have to handle the "data" event
        var buffer = "",
            dataToGet,
            route;

        response.on("data", function (chunk) {
            buffer += chunk;
        });

        response.on("end", function (err) {
            // finished transferring data
            // dump the raw data
            console.log(buffer);
            console.log("\n");
            //dataToGet = JSON.parse(buffer);
            if (err)
                res.json(err);
            res.json(buffer);
        });
    });
    url = "http://localhost:"+port+"/api/example/";
});

//exit amount
router.get('/exit/:amount', function (req, res, next) {
    url = "http://localhost:"+port+"/api/example/";

    var amout = req.params.amount;
    console.log(amout);
    var demande = "exit/" + amout;
    url += demande;
    var request = http.get(url, function (response) {
        // data is streamed in chunks from the server
        // so we have to handle the "data" event
        var buffer = "",
            dataToGet,
            route;

        response.on("data", function (chunk) {
            buffer += chunk;
        });

        response.on("end", function (err) {
            // finished transferring data
            // dump the raw data
            console.log(buffer);
            console.log("\n");
            //dataToGet = JSON.parse(buffer);
            if (err) {
                console.log(err);
                res.json(err);
            }
            res.json(buffer);
        });
    });
    url = "http://localhost:"+port+"/api/example/";
});

//get all the transactions of the node
router.get('/vault', function (req, res, next) {
    url = "http://localhost:"+port+"/api/example/";

    var demande = "vault";
    url += demande;
    var request = http.get(url, function (response) {
        // data is streamed in chunks from the server
        // so we have to handle the "data" event
        var buffer = "",
            dataToGet,
            route;

        response.on("data", function (chunk) {
            buffer += chunk;
        });

        response.on("end", function (err) {
            if (err) {

                res.json(err);
            }else{

                console.log(buffer)
                res.status(200).json(JSON.parse(buffer));}
        });
    });
    url = "http://localhost:"+port+"/api/example/";
});

//get a transaction by his ID
router.get('/vault/:id', function (req, res, next) {
    url = "http://localhost:"+port+"/api/example/";

    var id = req.params.id;

    var demande = "vault/" + id;
    url += demande;
    var request = http.get(url, function (response) {
        // data is streamed in chunks from the server
        // so we have to handle the "data" event
        var buffer = "",
            dataToGet,
            route;

        response.on("data", function (chunk) {
            buffer += chunk;
        });

        response.on("end", function (err) {
            if (err) {
                console.log(err);
                res.json(err);
            }

            // finished transferring data
            // dump the raw data
            console.log(buffer);
            console.log("\n");
            //dataToGet = JSON.parse(buffer);
            res.json(JSON.parse(buffer));
        });
    });
    url = "http://localhost:"+port+"/api/example/";
});

//get an issuer by his name
router.get('/issuers/:name', function (req, res, next) {

    url = "http://localhost:"+port+"/api/example/";
    var id = req.params.name;

    var demande = "issuers/" + id;
    url += demande;
    var request = http.get(url, function (response) {
        // data is streamed in chunks from the server
        // so we have to handle the "data" event
        var buffer = "",
            dataToGet,
            route;

        response.on("data", function (chunk) {
            buffer += chunk;
        });

        response.on("end", function (err) {
            if (err) {
                console.log(err);
                res.json(err);
            }

            // finished transferring data
            // dump the raw data
            console.log(buffer);
            console.log("\n");
            //dataToGet = JSON.parse(buffer);
            res.json(JSON.parse(buffer));
        });
    });
    url = "http://localhost:"+port+"/api/example/";
});
//get peer by id
router.get('/peers/hash/:id', function (req, res, next) {

    url = "http://localhost:10009/api/example/";
    var id = req.params.id;

    var demande = "peers/hash/" + id;
    url += demande;
    console.log(url);
    var request = http.get(url, function (response) {
        // data is streamed in chunks from the server
        // so we have to handle the "data" event
        var buffer = "",
            dataToGet,
            route;

        response.on("data", function (chunk) {
            buffer += chunk;
        });

        response.on("end", function (err) {
            if (err) {
                console.log(err);
                res.json(err);
            }

            // finished transferring data
            // dump the raw data
            console.log(buffer);
            console.log("\n");
            //dataToGet = JSON.parse(buffer);
            res.json(JSON.parse(buffer));
        });
    });
    url = "http://localhost:10009/api/example/";
});

//get the identity of node
router.get('/identity', function (req, res, next) {

    url = "http://localhost:"+port+"/api/example/";


    var demande = "identity";
    url += demande;
    var request = http.get(url, function (response) {
        // data is streamed in chunks from the server
        // so we have to handle the "data" event
        var buffer = "",
            dataToGet,
            route;

        response.on("data", function (chunk) {
            buffer += chunk;
        });

        response.on("end", function (err) {
            if (err) {
                console.log(err);
                res.json(err);
            }

            // finished transferring data
            // dump the raw data
            console.log(buffer);
            console.log("\n");
            //dataToGet = JSON.parse(buffer);
            res.json(JSON.parse(buffer));
        });
    });
   url = "http://localhost:"+port+"/api/example/";
});

module.exports = router;