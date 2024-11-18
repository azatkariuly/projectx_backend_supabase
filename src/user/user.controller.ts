import { Request, Response } from "express";
import { createUser, getUser, getUserById, verifyUserEmail } from "./user.service.js";
import * as bcrypt from 'bcrypt';
import { signJWT, verifyJWT } from "../lib/jwt.js";
import { compileActivationTemplate, sendMail } from "../lib/mail.js";

export const signUp = async (req: Request, res: Response) => {
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;

    try {
        const user = await getUser({email});
        if (user) {
            res.status(400).send('Such email already exist')
            return
        }

        const result = await createUser({email, name, password});
        const jwtUserId = signJWT({
            id: result.id
        })
        const activationUrl = `${process.env.FRONTEND_URL}/login/activation/${jwtUserId}`;
        const body = compileActivationTemplate(result.name as string, activationUrl);
    
        await sendMail({to: result.email, subject: 'Activate Your Account', body: body});

        res.json(result)
    } catch (e) {
        res.status(500).send('Something went wrong');
        return
    }
};

export const login = async (req: Request, res: Response) => {
    const email = req.body.email;
    const pass_word = req.body.password;

    try {
        const user = await getUser({email});
        if (!user) {
            res.status(400).send('Email is not registered')
            return
        }

        const isPasswordCorrect = await bcrypt.compare(pass_word, user.password);
        if (!isPasswordCorrect) {
            res.status(400).send('Password is not correct')
            return
        }

        const { password, ...userWithoutPass } = user;
        res.status(200).send(userWithoutPass)
    } catch (e) {
        res.status(500).send('Internal server error');
    }
}

export const verifyEmail = async (req: Request, res: Response) => {
    const jwtUserId = req.params.id;

    if (!jwtUserId) {
        res.status(400).send('Invalid or missing ID in the request');
        return
    }

    try {
        const payload = verifyJWT(jwtUserId);

        const userId = payload?.id;
        if (!userId) {
            res.status(404).send('Unable to confirm email')
            return
        }
    
        const user = await getUserById({userId});
        if (!user) {
            res.status(404).send('User does not exist')
            return
        }
    
        if (user.emailVerified) {
            res.status(400).send('User email is already verified')
            return
        }
    
        const result = await verifyUserEmail({userId});
        res.status(200).send('Email verified successfully')
    } catch (e) {
        res.status(500).send('Internal server error');
    }
    

}


// export const getProduct = async (req: Request, res: Response) => {
//     const productId = req.params.id;

//     const { data, error } = await supabase.from('Products').select().eq('id', productId).single()

//     if (error) {
//         res.status(400).send('No product found')
//     }

//     res.status(200).json(data)
// }