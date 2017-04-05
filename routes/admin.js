/**
 * Created by kello on 05/04/2017.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Bank = mongoose.model('bank');
var Client = mongoose.model('client');


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

module.exports = router;