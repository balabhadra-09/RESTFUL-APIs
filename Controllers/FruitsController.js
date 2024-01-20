const express = require("express");
const FruitsSchema = require("../Models/FruitsSchema");

AddFruits = async(req,res)=>{
    try {
        const {userId, fruitname , prize} = req.body;

    const user = await FruitsSchema.findOne({id:req.userId});
    if(!user){
       return res.status(404).send({success:false , message: "user not found"});
    }

    const data = new FruitsSchema({
        userId:req.body.userId,
        fruitname:req.body.fruitname,
        prize:req.body.prize
    });

    const result = await data.save();

    res.status(201).send({
        success:true , 
        messsage:"successfully added fruits"
    });

    } catch (error) {
        console.log(error)
       return res.status(400).send({message:"unable to add fruits"})
    }
}







updateFruits = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = await FruitsSchema.findOneAndUpdate(
            { _id: id }, 
            req.body,
            { new: true }
        );

        if (!updatedData) {
            return res.status(404).json({
                success: false,
                message: "Fruit not found",
            });
        }

        return res.status(201).json({
            success: true,
            message: "Update successful",
            data: updatedData,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Unable to update fruits",
        });
    }
};



DeleteFruits = async(req , res)=>{
    try {
        const id = req.params.id;
        const data = await FruitsSchema.findOneAndDelete({_id:id});
        if(!data){
            return res.status(400).json({
                success:true,
                message:"Unable to delete fruits"
            });
        }
        return res.status(201).json({
            success:true,
            message:"delete successful",
            data:data
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Unable to delete fruits",
        });
    }
}





getFruits = async(req , res)=>{
    try {
        const id = req.params.id;

        const data = await FruitsSchema.findOne({_id:id});
         if(!data){
            return res.status(404).json({
                success:false,
                message:"user not found",
            });
         }

         return res.status(201).json({
            success:true,
            message:"successfull",
            data:data
         })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "internal server error",
        });
    }
}

module.exports = {
    AddFruits,
    updateFruits,
    DeleteFruits,
    getFruits
}