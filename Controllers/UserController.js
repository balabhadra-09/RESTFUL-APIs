const UserSchema = require("../Models/UserSchema");

const jwt = require("jsonwebtoken");

const JWT_SECRET_KEY = "hdu38ryfbao@#7egkau";


     UserSignup = async (req, res) => {
          try {
            const { name, email, password } = req.body;
        
            const userdata = await UserSchema.findOne({ email: email });
            if (userdata) {
              return res.status(400).json({ message: "User already exists" });
            }
     
            const user = new UserSchema({
              name: req.body.name,
              email: req.body.email,
              password:req.body.password
            });
        
            const savedUser = await user.save(); 
        
            const token = jwt.sign({ email:user.email, id: user._id },JWT_SECRET_KEY,{expiresIn:"1d"});
        
            return res.status(201).json({
              success: true,
              message: "Successful signup",
              token: token
            });
          } catch (error) {
            console.error(error);
           return res.status(500).json({
              success: false,
              message: "Unsuccessful signup"
            });
          }
        };
        
         
Userlogin =async(req , res)=>{
     try {
          const {email , password} = req.body;
          const user = await UserSchema.findOne({email : email});
          if(!user){
              return res.status(404).json({message:"user not found"});
          }

          const token = jwt.sign({email:user.email, id: user._id},JWT_SECRET_KEY,{expiresIn:"1h"});
          return res.status(201).json({
               success:true,
               message:"successfull login",
               token:token,
               
          })

     } catch (error) {
          res.status(500).send({ 
               success:false,
               message:"Unsuccessfull login"
          });
     }
}



module.exports = {
     UserSignup,
     Userlogin


}
     


