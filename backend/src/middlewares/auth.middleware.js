import { User } from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import { blacklistToken } from "../models/blacklistToken.model.js";
import { Captain } from "../models/captain.model.js";


const authUser = async (req,res,next) =>{
 const token = req.cookies.token || req.headers.authorization?.split(' ')[1] //token can be found on the cookies and can be in the headers
 
 if(!token){
    return res.status(401).json({message:'Unauthorized'});
 }

 const isBlacklisted = await blacklistToken.findOne({token:token}); // checking that the token is blackListed then it should be unauthorized

 if(isBlacklisted){
    return res.status(401).json({message:'Unauthorized'})
 }
 
 try {
    const decoded = jwt.verify(token,process.env.JWT_SECRET);

    const user = await User.findById(decoded._id);
    
    req.user = user;
    return next();
 } catch (error) {
    return res.status(401).json({message:'Unauthorized'});
 }
}

const authCaptain = async (req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1] //token can be found on the cookies and can be in the headers
 
 if(!token){
    return res.status(401).json({message:'Unauthorized'});
 }

  const isBlacklisted = await blacklistToken.findOne({token:token}); // checking that the token is blackListed then it should be unauthorized

 if(isBlacklisted){
    return res.status(401).json({message:'Unauthorized'})
 }
 
 try {
    const decoded = jwt.verify(token,process.env.JWT_SECRET);

    const captain = await Captain.findById(decoded._id);
    
    req.captain = captain;
    return next();
 } catch (error) {
    return res.status(401).json({message:'Unauthorized'});
 }
}

export default {authUser,authCaptain}