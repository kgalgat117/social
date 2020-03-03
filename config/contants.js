var object = {
    SECRETKEY: process.env.SECRETKEY,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_CLUSTER: process.env.DB_CLUSTER,
    DB_NAME: process.env.DB_NAME,
    PORT: process.env.PORT,
    SALT: process.env.SALT
}

module.exports = object