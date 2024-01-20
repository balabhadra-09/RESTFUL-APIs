const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const FruitsSchema = Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true
        
    },
    fruitname:{
        type:String,
        require:true
    },
    prize:{
        type:Number,
        require:true
    }
});

module.exports = mongoose.model('fruit',FruitsSchema);
