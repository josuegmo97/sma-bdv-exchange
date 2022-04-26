import { Schema, model } from 'mongoose'

const AssetSchema = new Schema({
    name: { type: String, maxlength: 10, required: true, unique: true },
    rate_ves: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
}, { versionKey: false })

const Asset = model('assetschema', AssetSchema)

export default Asset;