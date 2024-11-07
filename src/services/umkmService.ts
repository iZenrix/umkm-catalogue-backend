import prisma from '../models';
import {CreateUmkmInput} from "../types/umkmTypes";

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

    console.log(data);

    try {
        const umkm = await prisma.umkm.create({
            data: {
                name: data.name,
                description: data.description,
                location: data.location,
                category_id: data.categoryId,
                panoramic_image: data.panoramicImage,
                user: {connect: {id: data.userId}},
                umkmTypes: {
                    connect: data.typeIds.map(type => ({id: type}))
                },
                images: {
                    create: data.images?.map(image => ({url: image}))
                },
                social_medias: {
                    create: data.socialMedias?.map((socialMedia) => ({
                        platform: socialMedia.platform,
                        url: socialMedia.url,
                    })),
                },
            },
            include: {
                user: true,
                umkmTypes: true,
                images: true,
                social_medias: true,
            }
        });

        console.log(umkm);

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
        console.log(error);
        return {
            error: true,
            status: 500,
            message: 'UMKM not created'
        }
    }
}