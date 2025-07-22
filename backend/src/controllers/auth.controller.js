import bcrypt from "bcryptjs";
import userModel from "../models/user.model.js";
import {createUser, findUser, findOneUser} from "../dao/user.dao.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js"


export async function registerController(req, res){
    const { username, email, password } = req.body;

    const isUserExist = await findOneUser({
        $or:[
         {
            username
         },
         {
            email
         }
        ]
    })

    if(isUserExist){
        return res.status(400).json({
            message: "user already exists",
        });
    }

    const hashedPassword  = await bcrypt.hash(password, 10)

    const user = await createUser({
        username,
        email,
        password: hashedPassword
    })

    return res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
        }
    })

}






export async function loginController(req, res) {
    const {email,password,username} = req.body;
    const user =await findOneUser({$or:[{email},{username}]})

    if(!user){
        return res.status(400).json({
            message:"Invalid email or password"
        })
    }
  
    const isPasswordValid = await bcrypt.compare(password,user.password)

    if(!isPasswordValid){
        return res.status(400).json({
            message:"Invalid email or password"
        })
    }

    const token = jwt.sign({_id:user._id},config.JWT_SECRET)

    res.cookie("token",token)

    return res.status(200).json({
        message: "User logged in successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
        }
    })


}