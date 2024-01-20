const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserShema = Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    paasword:{
        type:String,
        require:true
    }
});

module.exports = mongoose.model('User', UserShema);