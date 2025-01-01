import mongoose from 'mongoose'
import { DB_NAME } from '../constant.js'

const connectDB = async () =>{
     try {
         const ConnectionInstance = await mongoose.connect(`${process.env.MONGOOSE_URI}/${DB_NAME}`)
         console.log("Connected to DataBase SuccessFully"); 
     } catch (error) {
        console.log("Mongoose Error :",error)
     }
}

export {connectDB}