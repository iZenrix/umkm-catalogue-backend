import {Request, Response} from 'express';
import {
    createReview,
    getReview,
    updateReview,
    deleteReview,
    getReviewsByUMKM,
    getReviewsByUser,
} from "../services/reviewService";

export async function createSingleReview(req: Request, res: Response) {
    const {rating, comment, umkm_id, user_id} = req.body as {rating: number, comment: string, umkm_id: number, user_id: number};

    console.log('Creating review with rating:', rating, 'and comment:', comment);

    try {
        const result = await createReview(umkm_id, user_id, rating, comment);

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

export async function getSingleReview(req: Request, res: Response) {
    const {id} = req.params;

    try {
        const result = await getReview(Number(id));

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

export async function updateSingleReview(req: Request, res: Response) {
    const {id} = req.params;
    const {rating, comment} = req.body as {rating: number, comment: string};

    try {
        const result = await updateReview(Number(id), rating, comment);

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

export async function deleteSingleReview(req: Request, res: Response) {
    const {id} = req.params;

    try {
        const result = await deleteReview(Number(id));

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

export async function getReviewsByUMKMId(req: Request, res: Response) {
    const {id} = req.params;

    try {
        const result = await getReviewsByUMKM(Number(id));

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

export async function getReviewsByUserId(req: Request, res: Response) {
    const {id} = req.params;

    try {
        const result = await getReviewsByUser(Number(id));

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