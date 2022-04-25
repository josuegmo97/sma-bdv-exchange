// Database Configuration
let host     = 'bwkswrwdbb6cb5q-mongodb.services.clever-cloud.com'
let db       = 'bwkswrwdbb6cb5q'
let user     = 'upkozmhcd4oqmwnaako4'
let port     = 27017
let password = 'IsD53FFgu1goIJ9sPCyG'

const database = `mongodb://${user}:${password}@${host}:${port}/${db}`

export {database}