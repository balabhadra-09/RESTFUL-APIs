const mongoose = require("mongoose");

const connectDB = async ()=>{

    try {

        const mongodb = mongoose.connect("mongodb://127.0.0.1:27017/Store",{
            //  useNewUrlParser: true,
            //   useUnifiedTopology: true,
            // useFindAndModify:false

        });

        console.log("connected DB!!")
    } catch (error) {
        console.log(error);
        resizeBy.status(400).send({
            success:false,
            messaage:"connection faield "
        });
        
    }
}

module.exports = connectDB;