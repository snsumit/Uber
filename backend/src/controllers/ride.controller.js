import rideService from "../services/ride.service.js";

import { validationResult } from "express-validator";


const createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {pickup, destination, vehicleType } = req.body;
    try {
        const ride = await rideService.createRide({ user:req.user._id, pickup, destination, vehicleType });
        res.status(200).json(ride);
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

export default { createRide , getFare };