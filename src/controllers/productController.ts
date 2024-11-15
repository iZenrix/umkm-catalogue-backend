import {Request, Response} from 'express';
import {createProduct, updateProduct, deleteProduct, getUmkmProducts} from "../services/productService";

export async function createSingleProduct(req: Request, res: Response) {
    const {name, price, description, umkmId} = req.body as {name: string, price: number, stock: number, description: string, umkmId: number};

    const productImages = (req.files as { [fieldname: string]: Express.Multer.File[] })?.productImages;

    try {
        const result = await createProduct(umkmId, name, price, description, productImages);

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

export async function getAllProducts(req: Request, res: Response) {
    const {umkmId} = req.body as {umkmId: number};

    try {
        const result = await getUmkmProducts(umkmId);

        if (result.error) {
            res.status(result.status).json({error: result.message});
            return;
        }

        res.json(result);
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal Server Error'});
        return;
    }
}

export async function updateSingleProduct(req: Request, res: Response) {
    const {id, name, price, description} = req.body as {id: number, name: string, price: number, description: string};

    const productImages = (req.files as { [fieldname: string]: Express.Multer.File[] })?.productImages;

    try {
        const result = await updateProduct(id, name, price, description, productImages);

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

export async function deleteSingleProduct(req: Request, res: Response) {
    const {id} = req.params;

    try {
        const result = await deleteProduct(Number(id));

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