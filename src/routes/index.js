import routerX from 'express-promise-router'
import Transaction from './transaction'
import User from './user'

const router = routerX()

router.use('/transaction', Transaction)
router.use('/user', User)


export default router