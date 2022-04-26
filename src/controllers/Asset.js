import { initialAssets } from '../helpers/helpers'
import models from '../models/models'

const syncAsset = async () => {

    for (const asset of initialAssets) {
        await createAsset(asset.name, asset.rate)
    }

    const data = await assetList()
    return (data)
}

const createAsset = async (name, rate) => {

    try {
        const query = await models.Asset.findOne({ name })

        if (!query) {
            await models.Asset.create({ name, rate })
        }
        return
    } catch (e) {
        console.log(e)
        throw {
            message: 'Error in the proccess'
        }
    }

}

const assetList = async () => {

    try {
        const data = await models.Asset.find()
        return data
    } catch (error) {
        throw {
            message: 'Error in the proccess'
        }
    }

}

export default {
    syncAsset
}