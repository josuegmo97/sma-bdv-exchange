// Database Configuration
let host = process.env.DB_HOST
let db = process.env.DB
let user = process.env.DB_USER
let port = process.env.DB_PORT
let password = process.env.DB_PASSWORD

const database = `mongodb://${user}:${password}@${host}:${port}/${db}`

export { database }