import express from 'express'
const router = express.Router()
import { body } from 'express-validator'
import userController from '../controllers/user.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'

router.route('/register').post([
  body('email').isEmail().withMessage('Invalid email'),
  body('fullName.firstname').isLength({min:3}).withMessage('First name atleast must be three characters long'),
  body('password').isLength({min:6}).withMessage('Password must be atleast 6 characters long')

],userController.registerUser)

router.route('/login').post([
  body('email').isEmail().withMessage("Invalid email"),
  body('password').isLength({min:6}).withMessage("Password must contain atleast 6 charachters")

],userController.loginUser)

router.route('/profile').get(authMiddleware.authUser,userController.getUserProfile) //only for authorized user so here we will check it with the help of the middleware

router.route('/logout').get(authMiddleware.authUser,userController.logoutUser)



export default router