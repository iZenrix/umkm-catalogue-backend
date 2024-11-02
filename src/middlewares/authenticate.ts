import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

function authenticate(req: Request, res: Response, next: NextFunction){
    const token = req.headers.authorization?.split(' ')[1];

    if(!token){
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }

    jwt.verify(token, process.env.JWT_SECRET as string, (err: any, decoded: any) => {
       if(err) {
           res.status(401).json({error: 'Unauthorized'});
           return;
       }
       // @ts-ignore
        req.userId = decoded.id;
       return next();
    });
}

export default authenticate;