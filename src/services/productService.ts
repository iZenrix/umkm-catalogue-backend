import prisma from '../models';
import {put} from "@vercel/blob";

export async function getUmkmProducts(umkmId: number) {
    const existingUmkm = await prisma.umkm.findUnique({
        where: {id: umkmId}
    });

    if (!existingUmkm) {
        return {
            error: true,
            status: 404,
            message: 'UMKM not found'
        }
    }

    const products = await prisma.umkmProduct.findMany({
        where: {umkm_id: umkmId}
    });

    if (!products) {
        return {
            error: true,
            status: 404,
            message: 'Products not found'
        }
    }

    return {
        message: 'Products retrieved successfully',
        data: products
    }
}

export async function createProduct(umkmId: number, name: string, price: number, description: string, images?: Express.Multer.File[],) {
    const productImageUrls: { url: string }[] = [];
    if (images && images.length > 0) {
        for (const image of images) {
            try {
                const imageBlobResponse = await put(image.originalname, image.buffer, {
                    access: 'public',
                    token: process.env.VERCEL_BLOB_TOKEN,
                    contentType: image.mimetype,
                });

                productImageUrls.push({url: imageBlobResponse.url});
            } catch (error) {
                console.error('Error uploading image:', error);
                return {
                    error: true,
                    status: 500,
                    message: 'Failed to upload images'
                };
            }
        }
    }

    const product = await prisma.umkmProduct.create({
        data: {
            name,
            price,
            description,
            umkm_id: umkmId,
            product_image: {create: productImageUrls}
        }
    });

    if (!product) {
        return {
            error: true,
            status: 500,
            message: 'Product not created'
        }
    }

    return {
        message: 'Product created successfully',
        data: product
    }
}

export async function updateProduct(id: number, name: string, price: number, description: string, images?: Express.Multer.File[]) {
    const productImageUrls: { url: string }[] = [];
    if (images && images.length > 0) {
        for (const image of images) {
            try {
                const imageBlobResponse = await put(image.originalname, image.buffer, {
                    access: 'public',
                    token: process.env.VERCEL_BLOB_TOKEN,
                    contentType: image.mimetype,
                });

                productImageUrls.push({url: imageBlobResponse.url});
            } catch (error) {
                console.error('Error uploading image:', error);
                return {
                    error: true,
                    status: 500,
                    message: 'Failed to upload images'
                };
            }
        }
    }

    const product = await prisma.umkmProduct.update({
        where: {id},
        data: {
            name,
            price,
            description,
            product_image: {create: productImageUrls}
        }
    });

    if (!product) {
        return {
            error: true,
            status: 500,
            message: 'Product not updated'
        }
    }

    return {
        message: 'Product updated successfully',
        data: product
    }
}

export async function deleteProduct(id: number) {
    const product = await prisma.umkmProduct.delete({
        where: {id}
    });

    if (!product) {
        return {
            error: true,
            status: 500,
            message: 'Product not deleted'
        }
    }

    return {
        message: 'Product deleted successfully',
        data: product
    }
}