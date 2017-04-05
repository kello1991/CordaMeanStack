/**
 * Created by kello on 05/04/2017.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Bank = mongoose.model('bank');
var Client = mongoose.model('client');
var http = require("http");
url = "http://localhost:10005/api/example/";


router.get('/', function(req, res, next) {
    res.sendFile(req.app.get('admin_path') + 'index.html');
    console.log(req.path);
});
router.get('/bank', function (req, res, next) {
    Bank.find(function (err) {
        if (err) {
            console.log(err);
            res.sendFile(req.app.get('admin_path') + '404.html');
        }
    })
        .then(function (doc) {
            res.json(doc);
        });
});
router.get('/bank/clients', function (req, res, next) {
    var name = 'NodeA';
    Bank.findOne({corda_id: new RegExp('^' + name + '$', "i")}, function (err, doc) {
        res.json(doc.clients);
    });
});

//get client by id
router.get('/bank/client/:userId', function (req, res, next) {
    var clientId = req.params.userId;
    var name = 'NodeA';
    var client = {};
    Bank.findOne({corda_id: new RegExp('^' + name + '$', "i")}, function (err, doc) {
        var item;
        doc.clients.forEach(function (element) {
            if (element._id.toString() == clientId)
                client = element;
        });

        res.json(client);
    });

});
//get all transactions
router.get('/bank/client/:userId/transactions', function (req, res, next) {
    var clientId = req.params.userId;
    var name = 'NodeA';
    var client = {};
    Bank.findOne({corda_id: new RegExp('^' + name + '$', "i")}, function (err, doc) {
        var item;
        doc.clients.forEach(function (element) {
            if (element._id.toString() == clientId)
                client = element;
        });

        res.json(client.transactions);
    });
});

router.get('/bank/client/:userId/:transactionId', function (req, res, next) {
    var clientId = req.params.userId;
    var name = 'NodeA';
    var client = {};
    var transactionId = req.params.transactionId;
    console.log(transactionId);
    Bank.findOne({corda_id: new RegExp('^' + name + '$', "i")}, function (err, doc) {
        var item;
        doc.clients.forEach(function (element) {
            if (element._id.toString() == clientId) {
                element.transactions.push(transactionId);
                client = element;
            }
        });
        Bank.save(function (err) {
            if (err)
                console.log(err);
        });
        res.json(client.transactions);
    });
});

//get the name of the Node
router.get('/me', function (req, res, next) {
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
            res.json(dataToGet);
        });
    });
});
//get the peers
router.get('/peers', function (req, res, next) {
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
            res.json(dataToGet);
        });
    });
});

//get all the issuers
router.get('/issuers', function (req, res, next) {
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
            res.json(dataToGet);
        });
    });
});
//get all the notaries
router.get('/notaries', function (req, res, next) {
    var demande = "notaries";
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
            res.json(dataToGet);
        });
    });
});

// to
//get all the notaries
router.get('/balance', function (req, res, next) {
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
            res.json(dataToGet);
        });
    });
});
module.exports = router;