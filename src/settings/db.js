import  mongoose from "mongoose";
import { database } from "./keys";

// Connection to database
mongoose.connect(database, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
    .then(data => console.log("DB is connect"))
    .catch(err => console.log(err))