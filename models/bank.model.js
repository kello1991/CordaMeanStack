/**
 * Created by kello on 05/04/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Transaction = new Schema({
    idTran:String,
    type:String,
    amount:String,
    receiver:String,
    sender:String,
    date:String
});
var Bank = new Schema();
Bank.add(
    {
        corda_id:{
            type: String,
            require:true,
        },
        name: String,
        address:String,
        port:String,
        tel: String,
        username:{
            type: String,
            require:true,
            unique:true
        },
        password:{
            type: String,
            require:true
        },
        transactions:[Transaction]
    }
);


module.exports = mongoose.model('bank', Bank);
module.exports = mongoose.model('transaction', Transaction);

