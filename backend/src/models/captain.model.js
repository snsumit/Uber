import mongoose,{Schema} from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const captainSchema = new Schema({
  fullName:{
    firstname:{
        type:String,
        required:true,
        minlength:[3,'Firstname must be atleast 3 characters long ']
    },
    lastname:{
        type:String,
        minlength:[3,'Lastname must be atleast 3 characters long']
    }
   },
   email:{
      type:String,
      required:true,
      unique:true,
      lowercase:true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email address'],
   },
   password:{
    type:String,
    required:true,
    select:false,  //for the purpose of only when we need to include it
   },
   socketId:{
    type:String,
   },
   status:{
     type:String,
     enum:['active','inactive'],
     default:'inactive'
   },
   vehicle:{
       color:{
        type:String,
        required:true,
        minlength:[3,'Color must be atleast 3 characters long']
       },
       plate:{
        type:String,
        required:true,
        minlength:[3,'Plate must me atleast 3 characters long']
       },
       capacity:{
         type:Number,
         require:true,
         min:[1,'Capacity must be atleast 1']
       },
       vehicleType:{
         type:String,
         required:true,
         enum:['car','motorcycle','auto']
       }

   },
   location:{
    ltd:{
        type:Number 
    },
    lng:{
    type:Number
    }
   }

})

captainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'})
    return token;
}

captainSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password);

}

captainSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10);
}

export const Captain = mongoose.model('Captain',captainSchema)

