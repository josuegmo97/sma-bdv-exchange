import { initialUsers } from '../helpers/helpers'
import models from '../models/models'

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

export default {
    syncUser
}