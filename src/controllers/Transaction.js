import { throwErr, transactionsTypes, initialAssets } from '../helpers/helpers'
import models from '../models/models'
import UserController from './User'

// all transaction of user
const getUserTransaction = async (req, res) => {

    let alias = req.params.alias

    try {
        const query = await models.Transaction.find()
            .populate({
                path: 'user',
                match: {
                    alias
                },
                select: 'alias -_id name'

            })
            .sort({ 'createdAt': -1 })

        const { data, status } = setDataTransaction(query)

        res.status(status).json(data)
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
        console.log({ e })
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

const setDataTransaction = (transactions) => {

    let trans_exchange = 0;
    let trans_obtain = 0;
    let trans_withdrawal = 0;
    let t_e = []
    let t_o = []
    let t_w = []
    let data_ref = {}
    let user = ''

    transactions.forEach(t => {
        // Transaction token fake :v
        if (t.user) {

            if (user == '') user = t.user.name;

            data_ref = {
                asset_in: t.asset_in,
                asset_out: t.asset_out,
                amount: t.amount,
                createdAt: t.createdAt
            }

            if (t.type_transaction == 'exchange') {
                trans_exchange++
                t_e.push(data_ref)
            }

            if (t.type_transaction == 'obtain') {
                trans_obtain++
                t_o.push(data_ref)
            }

            if (t.type_transaction == 'withdrawal') {
                trans_withdrawal++
                t_w.push(data_ref)
            }
        }
    });

    let total = trans_exchange + trans_obtain + trans_withdrawal

    if (total == 0) {
        return {
            status: 404,
            data: {msg: 'Not result transaction'}
        }
    }

    return {
        status: 200,
        data: {
            'user': user,
            'total_trans': total,
            'trans_exchange': trans_exchange,
            'trans_obtain': trans_obtain,
            'trans_withdrawal': trans_withdrawal,
            'transactions': {
                'withdrawal': t_w,
                'obtain': t_o,
                'exchange': t_e,
            }
        }
    }


}


export default {
    getUserTransaction,
    createTransaction
}