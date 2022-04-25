import express from 'express'
import path from 'path'
import cors from 'cors'
import router from './routes/index'
import db from './settings/db'

const app = express();

app.set('port', process.env.PORT || 3000);

// middleware
app.use(cors());

app.use(express.json({ extended: true}))
app.use(express.urlencoded({ extended: true}))

// routes
app.use('/api', router)

// public
app.use(express.static(path.join(__dirname, 'public')))

app.listen(app.get('port'), () => {
    console.log("server on port: ", app.get('port'))
})