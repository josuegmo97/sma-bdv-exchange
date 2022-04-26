import { Schema, model } from 'mongoose'

const TransactionSchema = new Schema({
    user: { type: Schema.ObjectId, ref: "userschema", required: true },
    type_transaction: { type: String, required: true },
    asset_in: { type: Schema.ObjectId, ref: "asset", required: false },
    asset_out: { type: Schema.ObjectId, ref: "asset", required: false },
    amount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
}, { versionKey: false })

const Transaction = model('transactionschema', TransactionSchema)

export default Transaction;