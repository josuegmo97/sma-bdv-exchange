import { Schema, model } from 'mongoose'

const UserSchema = new Schema({
    name: { type: String, maxlength: 10, required: true },
    alias: { type: String, maxlength: 2, required: true, unique: true },
    createdAt: { type: Date, default: Date.now }
})

const User = model('userschema', UserSchema)

export default User;