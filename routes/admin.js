/**
 * Created by kello on 05/04/2017.
 */
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.sendFile(req.app.get('admin_path') + 'index.html');
    console.log(req.path);
});

module.exports = router;