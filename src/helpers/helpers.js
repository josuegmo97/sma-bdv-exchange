
export const initialUsers = [
    { name: 'Jose', alias: 'j' },
    { name: 'Alexander', alias: 'a' },
    { name: 'Gabriel', alias: 'g' },
    { name: 'Sasha', alias: 's' },
]

export const initialAssets = [
    { name: 'USD', rate: 1 },
    { name: 'BSF', rate: 5 },
    { name: 'EUR', rate: 1 }
]

export const transactionsTypes = ['withdrawal', 'exchange', 'obtain']

export const throwErr = (msg, status = 404) => { throw JSON.stringify({ err: true, msg, status }) }