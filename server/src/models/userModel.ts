
import {db} from '../configuration/dataConnection';
import type { User } from '../types/userTypes';


// creates new user in database, takes in a user and returns the user
export async function createNewUserDB(user:User): Promise<User> {
    const newUser = await db('users').insert({...user}, ['id', 'firstname', 'lastname', 'email', 'address', 'phone']);
    return newUser[0];
}


// Accepts an email and returns a user or undefined if not found.
export async function getUserByEmailDB(email: string): Promise<User | undefined> {
    const user: User | undefined = await db('users').select().where({'email': email}).first();
    return user;
}


