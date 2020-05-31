export interface Phone {
    code: string;
    number: number;
}

export interface SendMailParameters {
    to: string,
    subject: string,
    text: string
}

export interface ErrorResponse {
    status: number,
    message: string,
    code: number,
    flag: boolean
}

export interface CachedUserOTPArray extends Array<Object> {
    [key: number]: CachedUserOTP
}

export interface CachedUserOTP {
    user: string,
    otp: number,
    expires_in: Date
}