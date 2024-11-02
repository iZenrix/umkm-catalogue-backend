import { Request, Response } from 'express';
import prisma from '../models';
import {authenticateUser, registerUser} from "../services/userService";

export async function getProfile(req: Request, res: Response){
    // @ts-ignore
    const userId = req.userId;

    if(!userId){
        res.status(401).json({error: 'Unauthorized'});
        return
    }

    const user = await prisma.user.findUnique({
       where: {id:userId},
       select: {id: true, email: true, role: {select: {name:true}}},
    });

    res.json(user);
}

export async function login(req: Request, res: Response){
    const { email, password } = req.body;

    try {
        const { role, token } = await authenticateUser(email, password);
        res.json({ token, role });
    } catch (error){
        res.status(401).json({ error: 'Invalid email or password'})
    }
}

export async function register(req: Request, res: Response){
    const { email, password, role } = req.body;

    try {
      const user = await registerUser(email, password, role);
      res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
      // @ts-ignore
        res.status(400).json({ error: error.message });
    }
}