import {Request, Response} from 'express';
import {createUmkm, getUmkmList} from "../services/umkmService";
import {CreateUmkmInput} from "../types/umkmTypes";

export async function createSingleUmkm(req: Request, res: Response) {
    const { name, description, location, categoryId, typeIds, socialMedias, userId, contact, }: CreateUmkmInput = req.body;

    const panoramicImage = (req.files as { [fieldname: string]: Express.Multer.File[] })?.panoramicImage?.[0];
    const images = (req.files as { [fieldname: string]: Express.Multer.File[] })?.images;

    if (!name || !categoryId || !typeIds || !userId) {
        res.status(400).json({ error: 'Invalid input data' });
        return;
    }

    try {
        const data: CreateUmkmInput = { name, description, location, categoryId, typeIds, socialMedias, userId, contact, panoramicImage, images };

        const result = await createUmkm(data);

        if (result.error) {
            res.status(result.status).json({error: result.message});
            return;
        }

        res.status(201).json({message: result.message, data: result.data});
        return;
    } catch (error) {
        res.status(500).json({error: error});
        return;
    }
}

export async function getAllUmkm(req: Request, res: Response) {
    try {
        const result = await getUmkmList();

        if (result.error) {
            res.status(result.status).json({error: result.message});
            return;
        }

        res.json(result);
        return;
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'});
        return;
    }
}