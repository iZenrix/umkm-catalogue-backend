import {Request, Response} from 'express';
import prisma from '../models';
import {loginUser, registerUser} from "../services/userService";
import {AuthenticatedRequest} from "../types/types";

export async function getProfile(req: AuthenticatedRequest, res: Response) {
    const userId = req.userId;

    if (!userId) {
        res.status(401).json({error: 'Unauthorized'});
        return
    }

    const user = await prisma.user.findUnique({
        where: {id: userId},
        select: {id: true, name: true, email: true, role: {select: {name: true},},},
    });

    const data = {
        message: 'Successfully obtained user data',
        data: {user}
    }

    res.json(data);
}

export async function login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
        const result = await loginUser(email, password);

        if (result.error) {
            res.status(result.status).json({ error: result.message });
            return;
        }

        res.json(result);
        return;
    } catch (error) {
        res.status(401).json({ error: 'Invalid email or password' });
        return;
    }
}

export async function register(req: Request, res: Response) {
    const {name, email, password, role = "user"} = req.body;

    try {
        const result = await registerUser(name, email, password, role);

        if (result.error) {
            res.status(result.status).json({error: result.message});
            return
        }

        res.status(201).json({message: result.message, data: result.data});
        return;
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'});
        return;
    }
}