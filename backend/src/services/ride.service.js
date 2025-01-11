import { Ride } from "../models/ride.model.js";
import mapsService from "./maps.service.js";
import crypto from 'crypto';

async function getfare(pickup, destination) {
   if(!pickup || !destination){
       throw new Error('Pickup and destination are required');
   }
    const distanceTime = await mapsService.getDistanceAndTime(pickup, destination);

    
    const baseFare = {
        auto: 30,
        car: 50,
        moto: 20,
    }; // Base fare in currency units

    const perKmRate = {
        auto: 10,
        car: 15,
        moto: 8,
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        moto: 1.5,
    };

    if (!distanceTime || !distanceTime.distance || !distanceTime.time) {
        throw new Error("Invalid distanceTime object. Ensure distance and time are provided.");
    }

    const distanceInKm = distanceTime.distance.value / 1000; // Convert meters to kilometers
    const timeInMinutes = distanceTime.time.value / (1000 * 60); // Convert milliseconds to minutes

    const fare = {
        auto: baseFare.auto + (distanceInKm * perKmRate.auto) + (timeInMinutes * perMinuteRate.auto),
        car: baseFare.car + (distanceInKm * perKmRate.car) + (timeInMinutes * perMinuteRate.car),
        moto: baseFare.moto + (distanceInKm * perKmRate.moto) + (timeInMinutes * perMinuteRate.moto),
    };

    // Round fares to two decimal places for accuracy
    return {
        auto: parseFloat(fare.auto.toFixed(2)),
        car: parseFloat(fare.car.toFixed(2)),
        moto: parseFloat(fare.moto.toFixed(2)),
    };
};

function generateOTP(length) {
    if (!length || length <= 0) {
        throw new Error('Length must be a positive number');
    }
    const otp = crypto.randomInt(0, Math.pow(10, length)).toString().padStart(length, '0');
    return otp;
}


const createRide = async ({user,pickup,destination,vehicleType}) => {
    if(!user || !pickup || !destination || !vehicleType){
        throw new Error('User, pickup, destination, and vehicle type are required');
    }

    const fare = await getfare(pickup, destination);

     
    const ride = Ride.create({
        user,
        pickup,
        destination,
        fare: fare[vehicleType],
        otp: generateOTP(6),
    })

   return ride;
}

const confirmRide = async (rideId, captainId) => {
    if (!rideId || !captainId) {
        throw new Error('Ride ID and captain ID are required');
    }

    const ride = await Ride.findOneAndUpdate({
        _id: rideId,
    }, {
        status: 'accepted',
        captain: captainId,
    }, { new: true }).populate('user').populate('captain').select("+otp");

    if (!ride) {
        throw new Error('Ride not found');
    }

    return ride;
}

const startRide = async ({rideId, otp,captain}) => {
   if(!rideId || !otp ){
       throw new Error('Ride ID, OTP, and captain are required');
   }

   const ride = await Ride.findOne({
     _id:rideId,
   }).populate('user').populate('captain').select("+otp");

    if(!ride){
         throw new Error('Ride not found');
    }

    if(ride.status !== 'accepted'){
        throw new Error('Ride is not confirmed yet');
    }

    if(ride.otp !== otp){
        throw new Error('Invalid OTP');
    }

    await Ride.findOneAndUpdate({
        _id: rideId,
    }, {
        status: 'ongoing',
    });

    return ride;
}


const endRide = async ({rideId,captain}) => {
    if (!rideId) {
        throw new Error('Ride ID is required');
    }

    const ride = await Ride.findOne({
        _id: rideId,
         captain:captain._id,
    }).populate('user').populate('captain').select("+otp");

    if (!ride) {
        throw new Error('Ride not found');
    }
    
    if(ride.status !== 'ongoing'){
        throw new Error('Ride is not ongoing');
    }

    await Ride.findOneAndUpdate({
        _id: rideId,
    }, {
        status: 'completed',
    });
    

    return ride;
}

export default { createRide ,getfare,confirmRide,startRide,endRide};

