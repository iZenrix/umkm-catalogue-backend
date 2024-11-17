import {Response} from 'express';
import prisma from '../models';
import {AuthenticatedRequest} from "../types/types";

export async function getProfile(req: AuthenticatedRequest, res: Response) {
    try {
        const userId = req.userId;

        if (!userId) {
            res.status(401).json({error: 'Unauthorized'});
            return
        }

        const user = await prisma.user.findUnique({
            where: {id: userId},
            select: {
                id: true,
                name: true,
                email: true,
                role: {
                    select: {
                        name: true
                    }
                },
                umkms: true
            }
        });

        const transformedUser = {
            ...user,
            role: user!.role.name,
        };

        const data = {
            message: 'Successfully obtained user data',
            data: transformedUser
        }

        res.json(data);
    } catch (error) {
        res.status(500).json({
            error: error,
            message: 'Internal Server Error',
        });
    }
}