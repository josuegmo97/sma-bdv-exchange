import { initialAssets, throwErr } from '../helpers/helpers'
import models from '../models/models'

const syncAsset = async () => {

    for (const asset of initialAssets) {
        await createAsset(asset.name, asset.rate_ves)
    }

    const data = await assetList()
    return (data)
}

const createAsset = async (name, rate_ves) => {

    try {
        const query = await models.Asset.findOne({ name })

        if (!query) {
            await models.Asset.create({ name, rate_ves })
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

const searchAsset = async (asset) => {

    try {
        return await models.Asset.findOne({ name: asset })
    } catch (error) {
        throwErr("Asset not found")
    }

}

export default {
    syncAsset,
    searchAsset
}