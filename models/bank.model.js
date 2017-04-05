/**
 * Created by kello on 05/04/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Bank = new Schema({
    corda_id: String,
    name: String,
    address: String,
    tel: String,
    clients: [
        {
            username: String,
            password: String,
            email: String,
            firstname: String,
            lastname: String,
            transactions: [String]
        }
    ]
});

module.exports = mongoose.model('bank', Bank);