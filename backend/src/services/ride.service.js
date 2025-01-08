import { Ride } from "../models/ride.model.js";
import mapsService from "./maps.service.js";

async function getfare(pickup, destination) {
   if(!pickup || !destination){
       throw new Error('Pickup and destination are required');
   }
    const distanceTime = await mapsService.getDistanceAndTime(pickup, destination);

    
    const baseFare = {
        auto: 30,
        car: 50,
        motorcycle: 20,
    }; // Base fare in currency units

    const perKmRate = {
        auto: 10,
        car: 15,
        motorcycle: 8,
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        motorcycle: 1.5,
    };

    if (!distanceTime || !distanceTime.distance || !distanceTime.time) {
        throw new Error("Invalid distanceTime object. Ensure distance and time are provided.");
    }

    const distanceInKm = distanceTime.distance.value / 1000; // Convert meters to kilometers
    const timeInMinutes = distanceTime.time.value / (1000 * 60); // Convert milliseconds to minutes

    const fare = {
        auto: baseFare.auto + (distanceInKm * perKmRate.auto) + (timeInMinutes * perMinuteRate.auto),
        car: baseFare.car + (distanceInKm * perKmRate.car) + (timeInMinutes * perMinuteRate.car),
        motorcycle: baseFare.motorcycle + (distanceInKm * perKmRate.motorcycle) + (timeInMinutes * perMinuteRate.motorcycle),
    };

    // Round fares to two decimal places for accuracy
    return {
        auto: parseFloat(fare.auto.toFixed(2)),
        car: parseFloat(fare.car.toFixed(2)),
        motorcycle: parseFloat(fare.motorcycle.toFixed(2)),
    };
};



const createRide = async ({user,pickup,destination,vehicleType}) => {
    if(!user || !pickup || !destination || !vehicleType){
        throw new Error('User, pickup, destination, and vehicle type are required');
    }

    const fare = await getfare(pickup, destination);

     
    const ride = new Ride({
        user,
        pickup,
        destination,
        fare: fare[vehicleType],
        
    })

   return ride;
}

export default { createRide };

