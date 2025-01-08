import express from 'express'
import authMiddleware from '../middlewares/auth.middleware.js'
import mapController from '../controllers/map.controller.js'
import { query } from 'express-validator'

const router = express.Router()

router.route('/get-coordinates').get(
    query('address').isString().withMessage('Invalid address'),
    authMiddleware.authUser, 
    mapController.getCoordinates
)

router.route('/get-distance-time').get(
    query('source').isString().withMessage('Invalid source address'),
    query('destination').isString().withMessage('Invalid destination address'),
    authMiddleware.authUser, 
    mapController.getDistanceTime
)
router.route('/get-suggestions').get(
    query('input').isString().withMessage('Invalid input'),
    authMiddleware.authUser, 
    mapController.getAutoCompleteSuggestions
)
export default router