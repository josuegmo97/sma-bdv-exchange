import routerX from 'express-promise-router'
import Transaction from './transaction'

const router = routerX()

router.use('/transaction', Transaction)


export default router