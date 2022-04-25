import routerX from 'express-promise-router'
import User from './user'

const router = routerX()

router.use('/user', User)


export default router