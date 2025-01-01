import { Captain } from "../models/captain.model.js";


const createCaptain = ({firstname,lastname,email,password,color,plate,capacity,vehicleType})=>{
    if(!firstname || !email || !password || !color || !plate || ! capacity || !vehicleType){
       throw new Error("All fields are required");
    }

    const captain = Captain.create({
        fullName:{
            firstname,
            lastname,
        },
        email,
        password,
        vehicle:{
            color,
            plate,
            capacity, 
            vehicleType,
        }
        
    })
   
    return captain;


}

export default {createCaptain}