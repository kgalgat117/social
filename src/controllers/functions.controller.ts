import * as nodemailer from 'nodemailer'
import { CONSTANTS } from './../config/constants'
import { SendMailParameters } from './../properties/properties.interface'

var transport = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
        user: CONSTANTS.NODEMAILER_OUTLOOK_USERNAME,
        pass: CONSTANTS.NODEMAILER_OUTLOOK_PASSWORD
    },
    tls: {
        ciphers: 'SSLv3'
    }
})

export const sendMail = function (parameters: SendMailParameters): Promise<Object> {
    return transport.sendMail({
        from: CONSTANTS.NODEMAILER_OUTLOOK_USERNAME,
        to: parameters.to,
        subject: parameters.to,
        text: parameters.text
    });
}