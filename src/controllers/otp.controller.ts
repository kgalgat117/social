import { CachedUserOTPArray, CachedUserOTP } from './../properties/properties.interface'
import { IUserDocument } from './../users/user.types'

var cachedUserOTPArray: CachedUserOTPArray = [];

export const generateOTP = function (): number {
    return Math.floor(100000 + Math.random() * 900000)
}

export const storeUserOTP = function (user: IUserDocument, otp: number): void {
    let index: number = getCachedUserOTPIndex(user.primaryEmail)
    if (index == -1) {
        let newUserOTP: CachedUserOTP = {
            user: user.primaryEmail,
            otp: otp,
            expires_in: new Date()
        }
        cachedUserOTPArray.push(newUserOTP)
    } else {
        cachedUserOTPArray[index].otp = otp
        cachedUserOTPArray[index].expires_in = new Date()
    }
}

export const removeUserOTP = function (user: string): void {
    let index: number = getCachedUserOTPIndex(user)
    cachedUserOTPArray.splice(index, 1)
}

export const getCachedUserOTPIndex = function (user: string): number {
    let index: number = cachedUserOTPArray.findIndex((item: any) => {
        if (item.user == user) {
            return true
        }
        return false
    })
    return index
}

export const getUserOTP = function (user: string): CachedUserOTP | null {
    let index: number = getCachedUserOTPIndex(user)
    if (index == -1) {
        return null
    } else {
        return cachedUserOTPArray[index]
    }
}
