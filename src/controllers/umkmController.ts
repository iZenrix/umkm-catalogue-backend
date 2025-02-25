import {Request, Response} from 'express';
import {
    createUmkm,
    getUmkmList,
    getUmkmById,
    deleteUmkm,
    updateUmkm,
    umkmValidation,
    countViewIncrement,
} from "../services/umkmService";
import {CreateUmkmInput} from "../types/umkmTypes";
import {AuthenticatedRequest} from "../types/types";

export async function createSingleUmkm(req: Request, res: Response) {
    console.log(req.body);
    console.log(req.files);

    let locationReq, socialMediasReq, typeIdsReq;

    try {
        locationReq = JSON.parse(req.body.location);
        socialMediasReq = JSON.parse(req.body.socialMedias);
        typeIdsReq = JSON.parse(req.body.typeIds);
    } catch (error) {
        res.status(400).json({
            error: 'Invalid JSON format in location, social medias, or type ids',
            message: 'Ensure llocation, social medias, and type ids are valid JSON strings',
        });
        return;
    }

    const {
        categoryId,
        name,
        description,
        contact,
        typeIds,
        userId,
    }: CreateUmkmInput = req.body;

    const panoramicImage = (req.files as { [fieldname: string]: Express.Multer.File[] })?.panoramicImage?.[0];
    const images = (req.files as { [fieldname: string]: Express.Multer.File[] })?.images;
    const profileImage = (req.files as { [fieldname: string]: Express.Multer.File[] })?.profileImage?.[0];

    if (!name || !categoryId || !typeIds || !userId) {
        res.status(400).json({error: 'Invalid input data'});
        return;
    }

    try {
        const data: CreateUmkmInput = {
            categoryId,
            name,
            description,
            contact,
            location: locationReq,
            socialMedias: socialMediasReq,
            typeIds: typeIdsReq,
            userId,
            panoramicImage: panoramicImage,
            images: images,
            profileImage: profileImage,
        };

        const result = await createUmkm(data);

        if (result.error) {
            res.status(result.status).json({
                error: result.message,
                message: 'Internal Server Error',
                location: locationReq,
                socialMediasReq: socialMediasReq,
                body: req.body
            });
            return;
        }

        res.status(201).json({message: result.message, data: result.data});
        return;
    } catch (error) {
        res.status(500).json({
            error: error,
            message: 'Internal Server Error',
            location: locationReq,
            socialMediasReq: socialMediasReq,
            body: req.body
        });
        return;
    }
}

export async function getAllUmkm(req: Request, res: Response) {
    try {
        const result = await getUmkmList();

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

export async function getSingleUmkm(req: Request, res: Response) {
    const {id} = req.params;

    if (!id) {
        res.status(400).json({error: 'Invalid input data'});
        return;
    }

    try {
        const result = await getUmkmById(parseInt(id));

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

export async function deleteSingleUmkm(req: Request, res: Response) {
    const {id} = req.params;

    if (!id) {
        res.status(400).json({error: 'Invalid input data'});
        return;
    }

    try {
        const result = await deleteUmkm(parseInt(id));

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

export async function updateSingleUmkm(req: Request, res: Response) {
    const {id} = req.params;
    const {
        categoryId,
        name,
        description,
        contact,
        location,
        socialMedias,
        typeIds,
        userId,
    }: CreateUmkmInput = req.body;

    const panoramicImage = (req.files as { [fieldname: string]: Express.Multer.File[] })?.panoramicImage?.[0];
    const images = (req.files as { [fieldname: string]: Express.Multer.File[] })?.images;
    const profileImage = (req.files as { [fieldname: string]: Express.Multer.File[] })?.profileImage?.[0];

    if (!id || !name || !categoryId || !typeIds || !userId) {
        res.status(400).json({error: 'Invalid input data'});
        return;
    }

    try {
        const data: CreateUmkmInput = {
            name,
            description,
            location,
            categoryId,
            typeIds,
            socialMedias,
            userId,
            contact,
            panoramicImage,
            images,
            profileImage,
        };

        const result = await updateUmkm(parseInt(id), data);

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

export async function validateUmkm(req: AuthenticatedRequest, res: Response) {
    const {id} = req.params;
    const {status, rejectionNote} = req.body;
    const userId = req.userId;

    if (!id || !userId || !status) {
        res.status(400).json({error: 'Invalid input data'});
        return;
    }

    try {
        const result = await umkmValidation(parseInt(id), userId, status, rejectionNote);

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

export async function viewCountIncrement(req: Request, res: Response) {
    const {id} = req.params;

    if (!id) {
        res.status(400).json({error: 'Invalid input data'});
        return;
    }

    try {
        const result = await countViewIncrement(parseInt(id));

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