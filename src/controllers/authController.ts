import {Request, Response} from 'express';
import {loginUser, registerUser} from "../services/authService";

export async function login(req: Request, res: Response) {
    const {email, password} = req.body;

    try {
        const result = await loginUser(email, password);

        if (result.error) {
            res.status(result.status).json({error: result.message});
            return;
        }

        res.json(result);
        return;
    } catch (error) {
        res.status(500).json({
            error: error,
            message: 'Internal Server Error',
        });
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
        res.status(500).json({
            error: error,
            message: 'Internal Server Error',
        });
        return;
    }
}