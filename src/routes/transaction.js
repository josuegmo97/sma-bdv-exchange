import routerx from 'express-promise-router'
import TraController from '../controllers/Transaction'

const app = routerx();

// get
app.get('/:alias', TraController.getUserTransaction)

// post
app.post('/', TraController.createTransaction)


export default app;