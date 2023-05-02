const express = require("express");
const mongoose=require("mongoose")
const { UserModel } = require("../models/userModel")
const jwt = require("jsonwebtoken")

const bcrypt=require("bcrypt")
const userRouter = express.Router()



userRouter.post("/register", async (req, res) => {
    const {name,email,password,city,age}=req.body
    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                res.json({msg:"something went wrong","error":err.message})
            } else {
                const user = new UserModel({ name, email, password: hash, city, age })
                await user.save()
                console.log(user)
                res.send({msg:"New user registered"})
            }
        })
    } catch (err) {
        res.send({msg:"something went wrong","error":err.message})
    }
})

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await UserModel.find({ email })
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, function (err, result) {
                if (result) {
                    let token = jwt.sign({ useID: user[0]._id }, "jitu");
                    res.json({"msg":"Login succesful"})
                } else {
                    res.send({
                        error:err.message
                    })
              }
            });
        } else {
            res.send({"msg":"wrong credentials"})
        }
        
    } catch (err) {
        res.send({"msg":"wrong credentials"})
    }
})



module.exports = {
    userRouter
}