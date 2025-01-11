import { Server } from 'socket.io';
import { User } from './models/user.model.js';
import { Captain } from './models/captain.model.js';

let io;

export const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });

    //now we will store the socket id in the user or captain model

  

    


    io.on('connection', (socket) => {
        console.log(`New client connected: ${socket.id}`);

        socket.on('join', async (data) => {
            const {userType, userId} = data;

            console.log(`User ${userId} joined as ${userType}`);
            if (userType === 'user') {
                await User.findByIdAndUpdate(userId, {socketId: socket.id});
            }else if(userType === 'captain'){
                await Captain.findByIdAndUpdate(userId, {socketId: socket.id});
            }
        })
        //  for the need of captain location 
         socket.on('update-location-captain',async(data)=>{
          
            const {userId,location} = data;
            if (!location || !location.ltd || !location.lng) {
                console.error('Invalid location data');
                return;
            }
            await Captain.findByIdAndUpdate(userId,{location:{
                ltd:location.ltd,
                lng:location.lng
            }});
        })


        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });


    });
};

export const sendMessageToSocketId = (socketId, messageObject) => {
    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
    } else {
        console.error('Socket.io is not initialized.');
    }
};