import { Schema, model } from 'mongoose'

const UserSchema = new Schema({
    name: { type: String, maxlength: 10, required: true },
    alias: { type: String, maxlength: 2, required: true, unique: true },
    balance: {
        usd: { type: Number, default: 0 },
        bsf: { type: Number, default: 0 },
        eur: { type: Number, default: 0 },
    },
    createdAt: { type: Date, default: Date.now }
}, { versionKey: false })

const User = model('userschema', UserSchema)

export default User;