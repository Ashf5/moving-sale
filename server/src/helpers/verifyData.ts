
import validator from 'validator';
import {hash} from 'bcrypt';
import { User } from '../types/userTypes';


// a function for verifying user data before creating new user, returns an object of type User or throws an error.
export async function verifyUserData(firstname: string, lastname: string, password: string, email: string, phone?:string, address?:string): Promise<User> {
    // some basic validation on the different fields
    if (!validator.isEmail(email)) {
        throw new Error('Error in validating email')
    }
    else if (phone && !validator.isMobilePhone(phone)) {
        throw new Error('error validating phone');
    }
    else if (address !== undefined && validator.trim(address) === '') {
        throw new Error('error in address')
    }
    else if (validator.trim(password) === '' || validator.trim(firstname) === '' || validator.trim(lastname) === '') {
        throw new Error('Empty field')
    }

    // hash password
    const hashedPassword = await hash(password, 10);

    const userData: User = {
        firstname: firstname,
        lastname: lastname,
        password: hashedPassword,
        email: email
    }
    if (address) {
        userData.address = address;
    }
    if (phone) {
        userData.phone = phone;
    }

    return userData;

}

