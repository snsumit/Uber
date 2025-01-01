import { User } from "../models/user.model.js";
import userService from "../services/user.service.js";
import { validationResult } from "express-validator";
import { blacklistToken } from "../models/blacklistToken.model.js";

const registerUser = async (req,res)=>{
    
    
    const errors = validationResult(req);
     if(!errors.isEmpty()){
        res.status(400).json({errors:errors.array()}) // array methods return the array of an errors
     }
     
    const {fullName,email, password} = req.body;

    const isUserAlreadyExist = await User.findOne({email});

    if(isUserAlreadyExist){
        return res.status(400).json({message:'User already exist'})

    }
    const hashPassword = await User.hashPassword(password)

     const user = await userService.createUser({
        firstname:fullName.firstname,
        lastname:fullName.lastname,
        email,
        password:hashPassword,

     })

     const token = user.generateAuthToken()

     res.status(201).json({token, user})


}

const loginUser = async (req,res)=>{
   const errors = validationResult(req);

   if(!errors.isEmpty()){
      res.status(400).json({errors:errors.array()});
   }

   const { email , password} = req.body;
    
   const user = await User.findOne({email}).select("+password")

   if(!user){
     return res.status(401).json({message:"Invalid email or password"})
   }

   const isMatch = await user.isPasswordCorrect(password);

   if(!isMatch){
     return res.status(401).json({message:"Invalid email or password"});
   }
   
   const token = user.generateAuthToken()

   res.cookie('token',token)

   res.status(200).json({token,user})

}
 
const getUserProfile  = (req,res) => {
   res.status(200).json(req.user) // the user which sent at the time of the authentication will be sent
}

const logoutUser = async (req,res)=>{
   res.clearCookie('token');
   const token = req.cookies.token || req.headers.authorization.split(' ')[1];
   
   await blacklistToken.create({token}); 

   res.status(200).json({message:'Logged Out'})
}


export default {registerUser,loginUser,getUserProfile,logoutUser}





