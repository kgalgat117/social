export var CONSTANTS = {
    PROTOCOL: process.env.PROTOCOL || 'http',
    HOST: process.env.HOST || 'localhost',
    PORT: parseInt(process.env.PORT || '3000'),

    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_CLUSTER: process.env.DB_CLUSTER,
    DB_DATABASE: process.env.DB_DATABASE,

    NODEMAILER_OUTLOOK_USERNAME: process.env.NODEMAILER_OUTLOOK_USERNAME,
    NODEMAILER_OUTLOOK_PASSWORD: process.env.NODEMAILER_OUTLOOK_PASSWORD,

    JWT_ACCESS_TOKEN_PRIVATE_KEY: process.env.JWT_ACCESS_TOKEN_PRIVATE_KEY || '',
    JWT_ISSUER: process.env.JWT_ISSUER || 'http://localhost:3000',
    JWT_ACCESS_TOKEN_AUDIENCE: process.env.JWT_ACCESS_TOKEN_AUDIENCE || '',
    JWT_ACCESS_TOKEN_EXPIRE: parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRE || '86400')
}