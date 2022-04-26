import { throwErr, initialUsers } from '../helpers/helpers'
import models from '../models/models'
import AssetController from './Asset'

const syncUser = async () => {

    for (const user of initialUsers) {
        await createUser(user.name, user.alias,)
    }

    const data = await userList()
    return (data)
}

const createUser = async (name, alias) => {

    try {
        const query = await models.User.findOne({ alias })

        if (!query) {
            await models.User.create({ name, alias })
        }
        return
    } catch (e) {
        throw {
            message: 'Error in the proccess'
        }
    }

}

const userList = async () => {

    try {
        const data = await models.User.find()
        return data
    } catch (error) {
        throw {
            message: 'Error in the proccess'
        }
    }

}

const searchUserByAlias = async (alias) => {

    if (!alias) throwErr('Alias is required')

    try {
        const user = await models.User.findOne({ alias })

        if (!user) throw Error();

        return {
            err: false,
            data: user
        }

    } catch (error) {
        throwErr('User not found.')
    }
}

const updateBalance = async (type, user, amount, aIn, aOut) => {
    try {


        switch (type) {
            case 'withdrawal':
                user.balance[aOut.toLowerCase()] = (user.balance[aOut.toLowerCase()] - amount).toFixed(2);
                break;

            case 'exchange':
                const exch = await userExchange(amount, aIn)
                const receive = parseFloat(Number(exch.receive).toFixed(2))
                user.balance[aOut.toLowerCase()] = (user.balance[aOut.toLowerCase()] - amount).toFixed(2);
                user.balance[aIn.toLowerCase()] =  (user.balance[aIn.toLowerCase()] + receive).toFixed(2);
                break;

            case 'obtain':
                user.balance[aIn.toLowerCase()] = (user.balance[aIn.toLowerCase()] + amount).toFixed(2);
                break;

        }

        await user.save()
    } catch (error) {
        console.log('error', error)
        throwErr("Error to update user balance")
    }
}


const userExchange = async (amount, aIn) => {

    const _in = await AssetController.searchAsset(aIn);
    let amount_receive = 0

    if (aIn != 'BSF') {
        amount_receive = (amount / _in.rate_ves)
    } else {
        amount_receive = (amount * _in.rate_ves)
    }

    return {
        receive: parseFloat(amount_receive).toFixed(2)
    }

}

const getBalanceUser = async (req, res) => {

    let alias = req.params.alias

    try {
        const user = await searchUserByAlias(alias)
        res.json(user)
    } catch (error) {
        res.json({ msg: 'Error en la consulta', status: false })
    }
}

export default {
    syncUser,
    searchUserByAlias,
    updateBalance,
    getBalanceUser
}