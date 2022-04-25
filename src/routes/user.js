import routerx from 'express-promise-router'
import UseController from '../controllers/User'

const app = routerx();

// post
app.post('/sync', UseController.syncUser)

export default app;