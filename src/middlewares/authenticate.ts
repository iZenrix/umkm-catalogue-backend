import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import {AuthenticatedRequest} from "../types/types";

function authenticate(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).json({error: 'Token required'});
        return;
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET as string, (err: any, decoded: any) => {
        if (err) {
            res.status(401).json({error: 'Unauthorized'});
            return;
        }
        req.userId = (decoded as { id: number }).id;
        next();
    });
}

export default authenticate;