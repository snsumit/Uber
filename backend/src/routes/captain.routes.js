import express from 'express'
const router = express.Router()
import {body} from 'express-validator'
import captainController from  '../controllers/captain.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'


router.route('/register').post([
   body('email').isEmail().withMessage('Invalid email'),
   body('fullName.firstname').isLength({min:3}).withMessage('First name atleast must be three characters long'),
   body('password').isLength({min:6}).withMessage('Password must be atleast 6 characters long'),
   body('vehicle.color').isLength({min:3}).withMessage('Color must be atleast 3 characters long'),
   body('vehicle.plate').isLength({min:3}).withMessage('Plate must be atleast 3 characters long'),
   body('vehicle.capacity').isNumeric().withMessage('Capacity must be a number'),
   body('vehicle.vehicleType').isIn(['car','motorcycle','auto']).withMessage('Invalid vehicle type')
],captainController.registerCaptain)

router.route('/login').post([
    body('email').isEmail().withMessage("Invalid email"),
    body('password').isLength({min:6}).withMessage("Password must contain atleast 6 charachters")
],captainController.loginCaptain)

router.route('/profile').get(authMiddleware.authCaptain,captainController.getCaptainProfile)

router.route('/logout').get(authMiddleware.authCaptain,captainController.logoutCaptain)

export default router