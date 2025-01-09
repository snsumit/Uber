import mongoose from "mongoose";


const rideSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    captain:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Captain'
    },
    pickup:{
        type:String,
        required:true
    },
    destination:{
        type:String,
        required:true
    },
    fare:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:['pending','accepted','completed','cancelled' ,"ongoing"],
        default:'pending'
    },
    duration:{
        type:Number
    },  //inseconds
    distance:{
        type:Number
    }, //in meters
    
    paymentID:{
        type:String
    },
    orderId:{
        type:String
    },
    signature:{
        type:String
    },
    otp:{
        type:String,
        select:false,
        required:true
    },
    
    
})

export const Ride = mongoose.model('Ride',rideSchema)
