import { throwErr, transactionsTypes, initialAssets } from '../helpers/helpers'
import models from '../models/models'
import UserController from './User'

// all transaction of user
const getUserTransaction = async (req, res) => {

    try {
        const data = await models.Transaction.find().populate('user', { name: 2, alias: 1 }).sort({ 'createdAt': -1 })

        res.json(data)
    } catch (error) {
        return res.status(500).send(error)
    }

}

// new transaction
const createTransaction = async (req, res) => {

    try {
        const { user, assets } = await validations(req.body)

        const { type_transaction, amount } = req.body;

        await UserController.updateBalance(
            type_transaction, 
            user,
            parseFloat(amount),
            assets.aIn,
            assets.aOut
        )

        const transaction = await models.Transaction.create({
            user: user._id,
            type_transaction,
            asset_in: assets.aIn,
            asset_out: assets.aOut,
            amount
        })

        res.json(transaction)

    } catch (e) {
        console.log({e})
        res.status(e.status || 500).json({ 
            success: false,
            msg: e.msg || 'error al crear transaccion'
        })
    }

}

const validations = async (data) => {

    const { alias, type_transaction, asset_in, asset_out, amount } = data;

    // Valido que el monto sea numero
    (!Number(amount)) && throwErr('amount is required number');

    // Valido que el monto sea numero positivo
    (amount < 1) && throwErr('The amount cannot be negative or less than 1');

    // Valido los tipos de transacciones
    (!transactionsTypes.find(type => type == type_transaction)) && throwErr('Error transaction type');

    // Valido que el usuario exista
    const user = await UserController.searchUserByAlias(alias);

    // Valido el tipo de operacion y que esten los datos respectivos
    const assets = transactionTypeValidate(type_transaction, asset_in, asset_out, user.data, amount)

    // Si llega hasta este punto quiere decir que no hay ningun tipo de error
    return {
        user: user.data,
        assets
    }
}

const transactionTypeValidate = (type, asset_in = '', asset_out = '', user, amount) => {

    // Valido que los assets no venga vacios, que coincidan con los de la db y en caso de ser exchange que no sean los mismo
    switch (type) {
        case 'withdrawal':
            (!asset_out) && throwErr('Asset out is required');
            (!initialAssets.find(type => type.name == asset_out)) && throwErr('Invalid Asset');
            (amount > user.balance[asset_out.toLowerCase()]) && throwErr('Insufficient funds');
            asset_in = null
            break;

        case 'exchange':
            (!asset_out) && throwErr('Asset out is required');
            (!initialAssets.find(type => type.name == asset_out)) && throwErr('Invalid Asset');
            (!asset_in) && throwErr('Asset in is required');
            (!initialAssets.find(type => type.name == asset_in)) && throwErr('Invalid Asset');
            (asset_out == asset_in) && throwErr('Asset cannot be equal')
                (amount > user.balance[asset_out.toLowerCase()]) && throwErr('Insufficient funds');
            break;

        case 'obtain':
            (!asset_in) && throwErr('Asset in is required');
            (!initialAssets.find(type => type.name == asset_in)) && throwErr('Invalid Asset');
            asset_out = null
            break;

        default:
            throwErr('Asset not found')
            break;
    }
    return {
        aOut: asset_out, aIn: asset_in
    }
}


export default {
    getUserTransaction,
    createTransaction
}