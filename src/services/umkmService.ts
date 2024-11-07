import prisma from '../models';
import {CreateUmkmInput} from "../types/umkmTypes";
import {put} from '@vercel/blob';

export async function getUmkmList() {
    const umkmList = await prisma.umkm.findMany();

    if (!umkmList) {
        return {
            error: true,
            status: 404,
            message: 'UMKM not found'
        }
    }

    return {
        message: 'UMKM retrieved successfully',
        data: umkmList
    }
}

export async function createUmkm(data: CreateUmkmInput) {
    const existingUmkm = await prisma.umkm.findUnique({
        where: {name: data.name}
    });

    if (existingUmkm) {
        return {
            error: true,
            status: 400,
            message: 'UMKM already exists'
        }
    }

    let panoramicImageUrl = '';
    if (data.panoramicImage) {
        try {
            const file = data.panoramicImage as Express.Multer.File;

            console.log('data panoramic image:', data.panoramicImage.originalname);

            const panoramicBlobResponse = await put(data.panoramicImage.originalname, file.buffer, {
                access: 'public',
                token: process.env.VERCEL_BLOB_TOKEN,
                contentType: data.panoramicImage.mimetype,
            });

            panoramicImageUrl = panoramicBlobResponse.url;
        } catch (error) {
            console.error('Error uploading panoramic image:', error);
            return {
                error: true,
                status: 500,
                message: 'Failed to upload panoramic image'
            };
        }
    }

    const imageUrls: { url: string }[] = [];
    if (data.images && data.images.length > 0) {
        for (const image of data.images) {
            try {
                console.log('data image:', image.originalname);

                const imageBlobResponse = await put(image.originalname, image.buffer, {
                    access: 'public',
                    token: process.env.VERCEL_BLOB_TOKEN,
                    contentType: image.mimetype,
                });

                imageUrls.push({url: imageBlobResponse.url});
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

    try {
        const umkm = await prisma.umkm.create({
            data: {
                name: data.name,
                description: data.description,
                location: data.location,
                category_id: parseInt(String(data.categoryId)),
                panoramic_image: panoramicImageUrl,
                user: {connect: {id: parseInt(String(data.userId))}},
                umkm_types: {
                    connect: Array.isArray(data.typeIds) ? data.typeIds.map(type => ({id: parseInt(String(type))})) : [{id: parseInt(String(data.typeIds)),}]
                },
                images: {
                    create: imageUrls
                },
                social_medias: {
                    create: data.socialMedias?.map((socialMedia) => ({
                        platform: socialMedia.platform,
                        url: socialMedia.url,
                    })),
                },
                contact: data.contact
            },
            include: {
                user: true,
                umkm_types: true,
                images: true,
                social_medias: true,
            }
        });

        if (!umkm) {
            return {
                error: true,
                status: 500,
                message: 'UMKM not created'
            }
        }

        return {
            message: 'UMKM created successfully',
            data: umkm
        }
    } catch (error) {
        console.error(error);
        return {
            error: true,
            status: 500,
            message: 'UMKM not created'
        }
    }
}