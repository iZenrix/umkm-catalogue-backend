import {Request, Response} from 'express';
import {getCategories, createCategory, getCategory, updateCategory, deleteCategory,} from "../services/categoryService";

export async function createSingleCategory(req: Request, res: Response) {
    const {name} = req.body;

    try {
        const result = await createCategory(name);

        if (result.error) {
            res.status(result.status).json({error: result.message});
            return;
        }

        res.status(201).json({message: result.message, data: result.data});
        return;
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'});
        return;
    }
}

export async function getAllCategories(req: Request, res: Response) {
    try {
        const result = await getCategories();

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

export async function getSingleCategory(req: Request, res: Response) {
    const {id} = req.params;

    try {
        const result = await getCategory(Number(id));

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

export async function updateSingleCategory(req: Request, res: Response) {
    const {id} = req.params;
    const {name} = req.body;

    try {
        const result = await updateCategory(Number(id), name);

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

export async function deleteSingleCategory(req: Request, res: Response) {
    const {id} = req.params;

    try {
        const result = await deleteCategory(Number(id));

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