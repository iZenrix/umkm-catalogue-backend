import {Request, Response, NextFunction} from "express";
import prisma from '../models';
import {AuthenticatedRequest} from "../types/types";

function authorize(requiredRole: string) {
    return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        const userId = req.userId;

        if (!userId) {
            res.status(401).json({error: "Unauthorized"});
            return;
        }

        const user = await prisma.user.findUnique({
            where: {id: userId},
            include: {role: true}
        });

        if (!user || user.role.name !== requiredRole) {
            res.status(403).json({error: "Forbidden: Insufficient Role"});
            return;
        }

        next();
    };
}

export default authorize;