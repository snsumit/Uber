import mongoose , { Schema} from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new Schema({
    fullName:{
          firstname:{
            type:String,
            required:true,
            minlength:[3,'First Name must be atleat of 3 characters']
          },
          lastname:{
            type:String,
            minlength:[3,'last Name must be atleat of 3 characters']
          }  
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:[5,'Email must be atleast of 5 characters'] 
    },
    password:{
         type:String,
         required:true,
         select:false,
    },
    socketId:{
         type:String,
    }
})

userSchema.methods.generateAuthToken = function(){
  return jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'})  
}

userSchema.methods.isPasswordCorrect = async function(password){
   return await bcrypt.compare(password,this.password)
}

userSchema.statics.hashPassword = async function(password){
  return await bcrypt.hash(password,10)
}

export const User = mongoose.model('User',userSchema)


