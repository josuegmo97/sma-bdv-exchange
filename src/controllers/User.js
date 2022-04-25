import { initialUsers } from '../helpers/userHelper'
import models from '../models/models'

const syncUser = async (req, res, next) => {

    for (const user of initialUsers) {
        await createUser(res, user.name, user.alias,)
    }

    const data = await userList(res)
    res.json(data)
}

const createUser = async (res, name, alias) => {

    try {
        const query = await models.User.findOne({ alias })

        if (!query) {
            await models.User.create({ name, alias })
        }
        return
    } catch (e) {
        throw res.status(500).send({
            message: 'Error in the proccess'
        })
    }

}

const userList = async () => {

    try {
        const data = await models.User.find()
        return data
    } catch (error) {
        throw res.status(500).send({
            message: 'Error in the proccess'
        })
    }

}

export default {
    syncUser
}