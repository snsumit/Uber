
import mapService from '../services/maps.service.js';
import { validationResult } from 'express-validator';

const getCoordinates = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const query = req.query.address;
    console.log('Query:', query);
    try {
        const response = await mapService.getAddressCoordinates(query);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getDistanceTime  = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const source = req.query.source;
    const destination = req.query.destination;
    console.log('Source:', source);
    console.log('Destination:', destination);
    try {
        const response = await mapService.getDistanceAndTime(source, destination);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getAutoCompleteSuggestions = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const input = req.query.input;
   
    try {
        const response = await mapService.getAutoCompleteSuggestions(input);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export default { getCoordinates, getDistanceTime ,getAutoCompleteSuggestions };