import dotenv from 'dotenv'
dotenv.config();
import { app } from './app.js'
const PORT = process.env.PORT || 3000
import { connectDB } from './db/index.js';


connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`)
      })
}).catch((error)=>{
    console.log("MongoDB error:",error)
})

