import prisma from '../models';
import {CreateUmkmInput} from "../types/umkmTypes";
import {put} from '@vercel/blob';

enum ApprovalStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
}

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

    let profileImageUrl = '';
    if (data.profileImage) {
        try {
            const file = data.profileImage as Express.Multer.File;

            console.log('data profile image:', data.profileImage.originalname);

            const profileBlobResponse = await put(data.profileImage.originalname, file.buffer, {
                access: 'public',
                token: process.env.VERCEL_BLOB_TOKEN,
                contentType: data.profileImage.mimetype,
            });

            profileImageUrl = profileBlobResponse.url;
        } catch (error) {
            console.error('Error uploading profile image:', error);
            return {
                error: true,
                status: 500,
                message: 'Failed to upload profile image'
            };
        }
    }

    try {
        const umkm = await prisma.umkm.create({
            data: {
                category_id: parseInt(String(data.categoryId)),
                name: data.name,
                description: data.description,
                location: {
                    create: data.location ? {
                        name: data.location.name ?? '',
                        latitude: data.location.latitude ?? 0,
                        longitude: data.location.longitude ?? 0
                    } : undefined
                },
                panoramic_image: panoramicImageUrl,
                user: {connect: {id: parseInt(String(data.userId))}},
                umkm_types: {
                    connect: Array.isArray(data.typeIds) ? data.typeIds.map(type => ({id: parseInt(String(type))})) : [{id: parseInt(String(data.typeIds)),}]
                },
                images: {
                    create: imageUrls
                },
                profile_image: profileImageUrl,
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
        return {
            error: error,
            status: 500,
            message: 'UMKM not created'
        }
    }
}

export async function getUmkmById(id: number) {
    const umkm = await prisma.umkm.findUnique({
        where: {id},
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
            status: 404,
            message: 'UMKM not found'
        }
    }

    return {
        message: 'UMKM retrieved successfully',
        data: umkm
    }
}

export async function updateUmkm(id: number, data: CreateUmkmInput) {
    const existingUmkm = await prisma.umkm.findUnique({
        where: {id}
    });

    if (!existingUmkm) {
        return {
            error: true,
            status: 404,
            message: 'UMKM not found'
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

    let profileImageUrl = '';
    if (data.profileImage) {
        try {
            const file = data.profileImage as Express.Multer.File;

            console.log('data profile image:', data.profileImage.originalname);

            const profileBlobResponse = await put(data.profileImage.originalname, file.buffer, {
                access: 'public',
                token: process.env.VERCEL_BLOB_TOKEN,
                contentType: data.profileImage.mimetype,
            });

            profileImageUrl = profileBlobResponse.url;
        } catch (error) {
            console.error('Error uploading profile image:', error);
            return {
                error: true,
                status: 500,
                message: 'Failed to upload profile image'
            };
        }
    }

    try {
        const umkm = await prisma.umkm.update({
            where: { id },
            data: {
                name: data.name,
                description: data.description,
                location: data.location ? {
                    deleteMany: {},
                    create: {
                        name: data.location.name ?? '',
                        latitude: data.location.latitude ?? 0,
                        longitude: data.location.longitude ?? 0,
                    }
                } : undefined,
                category_id: parseInt(String(data.categoryId)),
                panoramic_image: panoramicImageUrl,
                umkm_types: {
                    set: Array.isArray(data.typeIds)
                        ? data.typeIds.map((type) => ({ id: parseInt(String(type)) }))
                        : [{ id: parseInt(String(data.typeIds)) }],
                },
                images: {
                    create: imageUrls,
                },
                profile_image: profileImageUrl,
                social_medias: {
                    deleteMany: {},
                    create: data.socialMedias?.map((socialMedia) => ({
                        platform: socialMedia.platform,
                        url: socialMedia.url,
                    })),
                },
                contact: data.contact,
            },
            include: {
                user: true,
                umkm_types: true,
                images: true,
                social_medias: true,
                location: true,
            },
        });

        if (!umkm) {
            return {
                error: true,
                status: 500,
                message: 'UMKM not updated'
            }
        }

        return {
            message: 'UMKM updated successfully',
            data: umkm
        }
    } catch (error) {
        console.error(error);
        return {
            error: true,
            status: 500,
            message: 'UMKM not updated'
        }
    }
}

export async function deleteUmkm(id: number) {
    const existingUmkm = await prisma.umkm.findUnique({
        where: {id}
    });

    if (!existingUmkm) {
        return {
            error: true,
            status: 404,
            message: 'UMKM not found'
        }
    }

    const umkm = await prisma.umkm.delete({
        where: {id}
    });

    if (!umkm) {
        return {
            error: true,
            status: 500,
            message: 'UMKM not deleted'
        }
    }

    return {
        message: 'UMKM deleted successfully',
        data: umkm
    }
}

export async function umkmValidation(userId: number, id: number, status: string, rejectionNote?: string) {
    const existingUmkm = await prisma.umkm.findUnique({
        where: { id }
    });

    if (!existingUmkm) {
        return {
            error: true,
            status: 404,
            message: 'UMKM not found'
        };
    }

    if (![ApprovalStatus.APPROVED, ApprovalStatus.REJECTED].includes(status as ApprovalStatus)) {
        return {
            error: true,
            status: 400,
            message: 'Invalid status'
        };
    }

    if (status === ApprovalStatus.REJECTED && !rejectionNote) {
        return {
            error: true,
            status: 400,
            message: 'Rejection note is required'
        };
    }

    if(status === ApprovalStatus.APPROVED) {
        const existingApprovedUmkm = await prisma.umkm.findFirst({
            where: {
                approval_status: ApprovalStatus.APPROVED,
                id: id
            }
        });

        if (existingApprovedUmkm) {
            return {
                error: true,
                status: 400,
                message: 'User already has an approved UMKM'
            };
        }
    }

    const updateData: any = {
        approval_status: status as ApprovalStatus,
        approved_by: userId,
        approved_at: new Date(),
    };

    if (status === ApprovalStatus.REJECTED) {
        updateData.rejection_note = rejectionNote;
    }

    const umkm = await prisma.umkm.update({
        where: { id },
        data: updateData
    });

    if (!umkm) {
        return {
            error: true,
            status: 500,
            message: `UMKM not ${status === ApprovalStatus.APPROVED ? 'approved' : 'rejected'}`
        };
    }

    return {
        message: `UMKM ${status === ApprovalStatus.APPROVED ? 'approved' : 'rejected'} successfully`,
        data: umkm
    };
}

export async function countViewIncrement(id: number) {
    const existingUmkm = await prisma.umkm.findUnique({
        where: { id }
    });

    if (!existingUmkm) {
        return {
            error: true,
            status: 404,
            message: 'UMKM not found'
        };
    }

    const umkm = await prisma.umkm.update({
        where: { id },
        data: {
            view_count: existingUmkm.view_count + 1
        }
    });

    if (!umkm) {
        return {
            error: true,
            status: 500,
            message: 'Failed to increment view count'
        };
    }

    return {
        message: 'View count incremented successfully',
        data: umkm
    };
}