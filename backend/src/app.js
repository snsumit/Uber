import express from 'express'
import userRouter from './routes/user.routes.js'
import captainRouter from './routes/captain.routes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mapRoutes from './routes/maps.routes.js'
const app = express()
import rideRoutes from './routes/ride.routes.js'

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use('/users',userRouter)
app.use('/captain',captainRouter)
app.use('/maps',mapRoutes)
app.use('/rides',rideRoutes)


export {app}