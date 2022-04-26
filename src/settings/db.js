import mongoose from "mongoose";
import { database } from "./keys";
import Asset from "./../controllers/Asset"
import User from "./../controllers/User"

// Connection to database
mongoose.connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("DB is connect")

        User.syncUser()
            .then((data) => console.log('Users load successfull'))
            .catch(err => console.log(err))

        Asset.syncAsset()
            .then((data) => console.log('Assets load successfull'))
            .catch(err => console.log(err))
    })
    .catch(err => console.log(err))