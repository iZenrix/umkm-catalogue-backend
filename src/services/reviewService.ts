import prisma from '../models';

export async function createReview(umkmId: number, userId: number, rating: number, comment: string) {
    if (rating < 1 || rating > 5) {
        return {
            error: true,
            status: 400,
            message: 'Rating must be between 1 and 5'
        }
    }

    const existingReview = await prisma.review.findFirst({
        where: {
            umkm_id: umkmId,
            user_id: userId
        }
    });

    if (existingReview) {
        return {
            error: true,
            status: 400,
            message: 'Review already exists'
        }
    }

    try {
        const review = await prisma.review.create({
            data: {
                umkm_id: umkmId,
                user_id: userId,
                rating,
                comment
            }
        });

        if (!review) {
            return {
                error: true,
                status: 500,
                message: 'Review not created'
            }
        }

        return {
            message: 'Review created successfully',
            data: review
        }
    }catch (error) {
        console.error('Error creating review:', error);
        return {
            error: true,
            status: 500,
            message: 'Internal server error'
        }
    }
}

export async function getReview(id: number) {
    const review = await prisma.review.findUnique({
        where: {id},
        include: {
            user: {
                select: {
                    name: true
                }
            },
        }
    });

    if (!review) {
        return {
            error: true,
            status: 404,
            message: 'Review not found'
        }
    }

    return {
        message: 'Review retrieved successfully',
        data: review
    }
}

export async function updateReview(id: number, rating: number, comment: string) {
    const existingReview = await prisma.review.findUnique({
        where: {id}
    });

    if (!existingReview) {
        return {
            error: true,
            status: 404,
            message: 'Review not found'
        }
    }

    const review = await prisma.review.update({
        where: {id},
        data: {
            rating,
            comment
        }
    });

    if (!review) {
        return {
            error: true,
            status: 500,
            message: 'Review not updated'
        }
    }

    return {
        message: 'Review updated successfully',
        data: review
    }
}

export async function deleteReview(id: number) {
    const existingReview = await prisma.review.findUnique({
        where: {id}
    });

    if (!existingReview) {
        return {
            error: true,
            status: 404,
            message: 'Review not found'
        }
    }

    const review = await prisma.review.delete({
        where: {id}
    });

    if (!review) {
        return {
            error: true,
            status: 500,
            message: 'Review not deleted'
        }
    }

    return {
        message: 'Review deleted successfully',
        data: review
    }
}

export async function getReviewsByUMKM(umkmId: number) {
    const existingUMKM = await prisma.umkm.findUnique({
        where: {id: umkmId},
    });

    if (!existingUMKM) {
        return {
            error: true,
            status: 404,
            message: 'UMKM not found'
        }
    }

    const reviews = await prisma.review.findMany({
        where: {umkm_id: umkmId},
        include: {
            user: {
                select: {
                    name: true
                }
            }
        }
    });

    return {
        message: 'Reviews retrieved successfully',
        data: reviews
    }
}

export async function getReviewsByUser(userId: number) {
    const existingUser = await prisma.user.findUnique({
        where: {id: userId}
    });

    if (!existingUser) {
        return {
            error: true,
            status: 404,
            message: 'User not found'
        }
    }

    const reviews = await prisma.review.findMany({
        where: {user_id: userId},
        include: {
            user: {
                select: {
                    name: true
                }
            }
        }
    });

    return {
        message: 'Reviews retrieved successfully',
        data: reviews
    }
}