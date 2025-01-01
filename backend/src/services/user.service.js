import {User} from '../models/user.model.js'


const createUser = async ({firstname,lastname,email,password}) =>{
    if(!firstname || !email || !password){
        throw new Error("All Fields are required")
    } 

    const user = User.create({
        fullName:{
            firstname,
            lastname,
        },
        email,
        password
    })
    return user
}


export default {createUser}


