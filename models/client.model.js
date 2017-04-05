/**
 * Created by kello on 05/04/2017.
 */
/**
 * Created by kello on 05/04/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Client = new Schema({
    username: String,
    password: String,
    email: String,
    firstname: String,
    lastname: String,
    transactions: [String]
});
module.exports = mongoose.model('client', Client);