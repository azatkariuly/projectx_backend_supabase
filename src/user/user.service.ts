import { prisma } from '../prismaClient.js';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export const createUser = async ({email, name, password}: {
    email: string;
    name: string;
    password: string
}) => {
    try {
        const res = await prisma.user.create({
            data: {
                email: email,
                name: name,
                password: await bcrypt.hash(password, 10)
            }
        })

        return res;
    } catch (e) {
        console.log('back createUser;', e)
        return null;
    }
}

export const getUser = async ({email} : {email: string}) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            }
        })
        return user;
    } catch (e) {
        console.log('back getUser;', e)
        return null;
    }
}

export const getUserById = async ({userId} : {userId: string}) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            }
        })
        return user;
    } catch (e) {
        console.log('back getUserById;', e)
        return null;
    }
}

export const verifyUserEmail = async ({userId} : {userId: string}) => {
    try {
        const user = await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                emailVerified: new Date(),
            }
        });
        return user;
    } catch (e) {
        console.log('back verifyUserEmail;', e)
        return null;
    }
}