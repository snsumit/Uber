import { Captain } from "../models/captain.model.js";
import captainService from  '../services/captain.service.js'
import { validationResult } from "express-validator";
import { blacklistToken } from "../models/blacklistToken.model.js";
const registerCaptain = async (req,res)=>{
  
    const erros = validationResult(req);

    if(!erros.isEmpty()){
        return res.status(400).json({erors:erros.array()})
    }

    const {fullName,email,password,vehicle} = req.body

    const isCaptainAlreadyExist = await Captain.findOne({email});

    if(isCaptainAlreadyExist){
        return res.status(400).json({message:"Captain already exist"})
    }
    
    const hashPassword = await Captain.hashPassword(password);

    const captain = await captainService.createCaptain({
        firstname:fullName.firstname,
        lastname:fullName.lastname,
        email,
        password:hashPassword,
        color:vehicle.color,
        plate:vehicle.plate,
        capacity:vehicle.capacity,
        vehicleType:vehicle.vehicleType
    })

    const token = captain.generateAuthToken()


    res.status(201).json({token , captain})



}

const loginCaptain = async (req,res)=>{
  const erros = validationResult(req);

  if(!erros.isEmpty()){
    return res.status(400).json({erros:erros.array()})
  }
  
  const {email,password} = req.body;
  
  const captain = await Captain.findOne({email}).select("+password");

  if(!captain){
    return res.status(401).json({messahe:"Invalid email or password "})
  }

  const isMatch = await captain.isPasswordCorrect(password)

  if(!isMatch){
    return res.status(401).json({message:"Invalid email or password"})
  }

  const token = captain.generateAuthToken();
  
  res.cookie('token',token)

  res.status(200).json({token , captain })


}

const getCaptainProfile = async (req,res)=>{
    res.status(200).json(req.captain)
}

const logoutCaptain = async (req,res)=>{
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
       
    await blacklistToken.create({token}); 

    res.clearCookie('token');
    
    res.status(200).json({message:'Logged Out'})
} 



export default {registerCaptain,loginCaptain,getCaptainProfile,logoutCaptain}