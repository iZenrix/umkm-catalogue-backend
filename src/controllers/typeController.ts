import {Request, Response} from 'express';
import {getTypes, createType, getType, updateType, deleteType, getTypesByCategory} from "../services/typeService";

export async function createSingleType(req: Request, res: Response) {
    const {name, category_id} = req.body as {name: string, category_id: number};

    try {
        const result = await createType(name, category_id);

        if (result.error) {
            res.status(result.status).json({error: result.message});
            return;
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

export async function getAllTypes(req: Request, res: Response) {
    try {
        const result = await getTypes();

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

export async function getSingleType(req: Request, res: Response) {
    const {id} = req.params;

    try {
        const result = await getType(Number(id));

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

export async function updateSingleType(req: Request, res: Response) {
    const {id} = req.params;
    const {name, category_id} = req.body as {name: string, category_id: number};

    try {
        const result = await updateType(Number(id), name, category_id);

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

export async function deleteSingleType(req: Request, res: Response) {
    const {id} = req.params;

    try {
        const result = await deleteType(Number(id));

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

export async function getTypesByCategoryFunc(req: Request, res: Response) {
    const {id} = req.params;

    try {
        const result = await getTypesByCategory(Number(id));

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