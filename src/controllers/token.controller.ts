import { sign, verify } from 'jsonwebtoken'
import { PayloadData } from './../properties/properties.interface'
import { CONSTANTS } from './../config/constants'
import { ISessionDocument } from './../sessions/session.types'
import { SessionModel } from './../sessions/sessions.model'
import { Types } from 'mongoose'

export function createAccessToken(payload: PayloadData): string {
    return sign(payload, CONSTANTS.JWT_ACCESS_TOKEN_PRIVATE_KEY, { issuer: CONSTANTS.JWT_ISSUER, audience: CONSTANTS.JWT_ACCESS_TOKEN_AUDIENCE, expiresIn: CONSTANTS.JWT_ACCESS_TOKEN_EXPIRE })
}

export function validateAccessToken(token: string): PayloadData | null {
    let payload: PayloadData | null = {
        sessionId: '',
        user: ''
    }
    try {
        let temp: any = verify(token, CONSTANTS.JWT_ACCESS_TOKEN_PRIVATE_KEY, { issuer: CONSTANTS.JWT_ISSUER, audience: CONSTANTS.JWT_ACCESS_TOKEN_AUDIENCE })
        payload.sessionId = temp.sessionId
        payload.user = temp.user
    } catch (catchError) {
        payload = null
    }
    return payload
}

export function createSession(user: string, tokenType: string): Promise<ISessionDocument> {
    return SessionModel.create({ tokenType: tokenType, user: user })
}

export function getSession(sessionId: string) {
    return SessionModel.findOne({
        _id: Types.ObjectId(sessionId)
    }).exec()
}