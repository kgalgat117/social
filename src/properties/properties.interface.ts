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
    flag: boolean
}