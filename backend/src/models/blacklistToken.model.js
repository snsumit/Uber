import mongoose ,{Schema}  from 'mongoose'

const blacklistTokenSchema = new Schema({
  token:{
    type:String,
    required:true,
    unique:true
  },
  createdAt:{
    type:Date,
    default:Date.now,
    expires:86400  // 24hours in seconds
  }

})

export const blacklistToken = mongoose.model('BlacklistToken',blacklistTokenSchema)
