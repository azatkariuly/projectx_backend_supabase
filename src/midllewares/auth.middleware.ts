import { NextFunction, Request, Response } from "express"
import jwt from 'jsonwebtoken';
import 'dotenv/config';

declare module 'express-serve-static-core' {
    interface Request {
      user?: any;
    }
}

export const auth = async ( req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.header('authorization')
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        res.status(401).send('Access denied');
        return
    }

    jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, user) => {
        if (err) {
            res.status(403).send('Forbidden');
            return
        }

        req.user = user
        next()
    })

    next()
}