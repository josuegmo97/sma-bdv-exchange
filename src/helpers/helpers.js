
export const initialUsers = [
    { name: 'Jose', alias: 'j' },
    { name: 'Alexander', alias: 'a' },
    { name: 'Gabriel', alias: 'g' },
    { name: 'Sasha', alias: 's' },
]

export const initialAssets = [
    { name: 'USD', rate_ves: 4.4 },
    { name: 'BSF', rate_ves: 6 },
    { name: 'EUR', rate_ves: 5.3 }
]

export const transactionsTypes = ['withdrawal', 'exchange', 'obtain']

export const throwErr = (msg, status = 404) => { throw  {err: true, msg, status } }