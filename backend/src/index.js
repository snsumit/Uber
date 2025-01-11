import dotenv from 'dotenv'
dotenv.config();
import { app } from './app.js'
const PORT = process.env.PORT || 3000
import { createServer } from 'http'
import { connectDB } from './db/index.js';
import { initializeSocket } from './socket.js';
const server = createServer(app)

connectDB().then(()=>{
    server.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`)
        initializeSocket(server)
      })
}).catch((error)=>{
    console.log("MongoDB error:",error)
})

