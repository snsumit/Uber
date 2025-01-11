import express from 'express'
const router = express.Router()
import { body } from 'express-validator'
import rideController from '../controllers/ride.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'
import {query} from 'express-validator'
 router.route('/create').post(
    authMiddleware.authUser,
    body('pickup').isString().isLength({min:3}).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({min:3}).withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn(['auto', 'car', 'moto']).withMessage('Invalid vehicle type'),
    rideController.createRide
)
router.route('/get-fare').get(
    authMiddleware.authUser,
    query('pickup').isString().isLength({min:3}).withMessage('Invalid pickup address'),
    query('destination').isString().isLength({min:3}).withMessage('Invalid destination address'),
    rideController.getFare
)

router.route('/confirm').post(
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride ID'),
    rideController.confirmRide
)

router.route('/start-ride').get(
    authMiddleware.authCaptain,
    query('rideId').isMongoId().withMessage('Invalid ride ID'),
    query('otp').isString().isLength({min:6, max:6}).withMessage('Invalid OTP'),
    rideController.startRide
)

router.route('/end-ride').post(
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride ID'),
    
    rideController.endRide
)


export default router