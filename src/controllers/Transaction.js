import { throwErr, transactionsTypes, initialAssets } from '../helpers/helpers'
import models from '../models/models'
import UserController from './User'

// all transaction of user
const getUserTransaction = async (req, res) => {

    try {
        const data = await models.Transaction.find()

        res.json(data)
    } catch (error) {
        return res.status(500).send(error)
    }

}

// new transaction
const createTransaction = async (req, res) => {

    const user = await validations(req.body)

    console.log({user})
    // Guardo en DB

}

const validations = async (data) => {

    const { alias, type_transaction, asset_in, asset_out, amount } = data;

    // Valido que el monto sea numero
    (!Number(amount)) && throwErr('Amount is required number');

    // Valido los tipos de transacciones
    (!transactionsTypes.find(type => type == type_transaction)) && throwErr('Error transaction type');

    // Valido el tipo de operacion y que esten los datos respectivos
    transactionTypeValidate(type_transaction, asset_in, asset_out)

    // Valido que el usuario exista
    const user = await UserController.searchUserByAlias(alias);

    // Si llega hasta este punto quiere decir que no hay ningun tipo de error
    return user.data
}

const transactionTypeValidate = (type, asset_in = '', asset_out = '') => {

    switch (type) {
        case 'withdrawal':
            (!asset_out) && throwErr('Asset out is required');
            (!initialAssets.find(type => type.name == asset_out)) && throwErr('Invalid Asset');
            break;

        case 'exchange':
            (!asset_out) && throwErr('Asset out is required');
            (!initialAssets.find(type => type.name == asset_out)) && throwErr('Invalid Asset');
            (!asset_in) && throwErr('Asset in is required');
            (!initialAssets.find(type => type.name == asset_in)) && throwErr('Invalid Asset');
            (asset_out == asset_in) && throwErr('Asset cannot be equal')
            break;

        case 'obtain':
            (!asset_in) && throwErr('Asset in is required');
            (!initialAssets.find(type => type.name == asset_in)) && throwErr('Invalid Asset');
            break;

        default:
            throwErr('Asset not found')
            break;
    }
    return
}

export default {
    getUserTransaction,
    createTransaction
}