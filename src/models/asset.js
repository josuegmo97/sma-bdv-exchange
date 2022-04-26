import { Schema, model } from 'mongoose'

const AssetSchema = new Schema({
    name: { type: String, maxlength: 10, required: true },
    rate: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
})

const Asset = model('assetschema', AssetSchema)

export default Asset;