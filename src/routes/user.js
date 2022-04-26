import routerx from 'express-promise-router'
import UseController from '../controllers/User'

const app = routerx();

// get
app.get('/:alias', UseController.getBalanceUser)



export default app;