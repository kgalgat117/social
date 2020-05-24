import { Phone } from './../properties/phone.interface'

export interface User {
    _id: string;
    firstName: string;
    lastName: number;
    primaryNumber: Phone;
    primaryEmail: string;
    bio: string;
    profileImage: string;
}