import { Member, MemberStore } from "../models/members";
import express, {Request, Response} from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()

const {
    TOKEN_SECRET
} = process.env

const store = new MemberStore;

const index = async(req: Request, res: Response) => {
    try {

        const result = await store.index();
        res.send(result);
    } catch(err) {
        res.status(401);
        res.send(`${err}`);
    }
}
 const register = async(req: Request, res: Response) => {
    try {
        const member: Member = {
            first_name: req.body.first_name as string,
            last_name: req.body.last_name as string,
            password: req.body.password as string,
            email: req.body.email as string,
            phone: Number(req.body.phone),
            dob: req.body.dob as Date
        }
        const result = await store.register(member)
        res.send(result);
    } catch(err) {
        res.send(`${err}`)
    }
 }

 const authenticate = async(req: Request, res:Response) => {
    try {
        const login_info = {
            email: req.body.email as string,
            password: req.body.password as string
        }
        const result = await store.authenticate(login_info.email as string, login_info.password as string);
        if (result != null) {
            const token = jwt.sign({ result }, TOKEN_SECRET as string)
            res.send(token)
        }
        res.send('Unauthorized')
    } catch(err) {
        res.send(`${err}`)
    }
 }

const member_route = (app: express.Application) => {
    app.get('/members', index)
    app.post('/members/register', register);
    app.get('/members/auth', authenticate)
}


export default member_route;

