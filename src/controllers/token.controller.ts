import { sign, verify } from 'jsonwebtoken'
import { PayloadData } from './../properties/properties.interface'
import { CONSTANTS } from './../config/constants'
import { ISessionDocument } from './../sessions/session.types'
import { SessionModel } from './../sessions/sessions.model'

export function createAccessToken(payload: PayloadData): string {
    return sign(payload, CONSTANTS.JWT_ACCESS_TOKEN_PRIVATE_KEY, { issuer: CONSTANTS.JWT_ISSUER, audience: CONSTANTS.JWT_ACCESS_TOKEN_AUDIENCE, expiresIn: CONSTANTS.JWT_ACCESS_TOKEN_EXPIRE })
}

export function validateAccessToken(token: string) {
    let payload = null
    try {
        payload = verify(token, CONSTANTS.JWT_ACCESS_TOKEN_PRIVATE_KEY, { issuer: CONSTANTS.JWT_ISSUER, audience: CONSTANTS.JWT_ACCESS_TOKEN_AUDIENCE })
    } catch (catchError) {
        payload = null
    }
    return payload
}

export function createSession(user: string, tokenType: string): Promise<ISessionDocument> {
    return SessionModel.create({ tokenType: tokenType, user: user })
}