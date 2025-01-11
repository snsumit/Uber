import rideService from "../services/ride.service.js";
import mapsService from "../services/maps.service.js";
import { validationResult } from "express-validator";
import { sendMessageToSocketId } from "../socket.js";
import { Ride } from "../models/ride.model.js";
const createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {pickup, destination, vehicleType } = req.body;
    try {
        const ride = await rideService.createRide({ user:req.user?._id, pickup, destination, vehicleType });
        res.status(200).json(ride);
         
        // give the ride to the captain
        const pickupCoordinates = await mapsService.getAddressCoordinates(pickup);
        console.log(pickupCoordinates);
        
        const captainInRadius = await mapsService.getCaptainsInTheRadius(pickupCoordinates.latitude,pickupCoordinates.longitude, 5);
        
        ride.otp = ""
       
        const rideWithUser = await Ride.findById(ride._id).populate('user');
      
        captainInRadius.map(async (captain) => {
            sendMessageToSocketId(captain.socketId, { 
                event: "new-ride",
                data: rideWithUser
             });
        })

       
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    

    const { pickup, destination } = req.query;
    
    try {
        const fare = await rideService.getfare(pickup, destination);
        res.status(200).json(fare);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { rideId } = req.body;
    try {
        const ride = await rideService.confirmRide(rideId, req.captain._id);
        console.log(ride)
        // send the user that its ride is confirmed using socket.io
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        });
        res.status(200).json(ride);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const startRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { rideId, otp } = req.query;
    try {
        const ride = await rideService.startRide({rideId, otp ,captain:req.captain});

        // send the user that its ride is started using socket.io
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        });

        res.status(200).json(ride);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const endRide = async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {rideId} = req.body;
    try {
        const ride = await rideService.endRide({rideId,captain:req.captain});
        // send the user that its ride is ended using socket.io
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        });
        res.status(200).json(ride);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export default { createRide , getFare,confirmRide,startRide,endRide};