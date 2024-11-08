import prisma from '../models';

export async function getTypes() {
    const types = await prisma.umkmType.findMany();

    if (!types) {
        return {
            error: true,
            status: 404,
            message: 'Types not found'
        }
    }

    return {
        message: 'Types retrieved successfully',
        data: types
    }
}

export async function createType(name: string, categoryId: number) {
    try {
        const categoryExists = await prisma.umkmCategory.findUnique({
            where: {id: categoryId}
        });

        if (!categoryExists) {
            return {
                error: true,
                status: 400,
                message: 'Invalid category ID'
            };
        }

        const existingType = await prisma.umkmType.findUnique({
            where: {name}
        });

        if (existingType) {
            return {
                error: true,
                status: 400,
                message: 'Type already exists'
            };
        }

        const type = await prisma.umkmType.create({
            data: {
                name,
                category_id: categoryId
            }
        });

        return {
            message: 'Type created successfully',
            data: type
        };
    } catch (error) {
        console.error('Error creating type:', error);
        return {
            error: true,
            status: 500,
            message: 'Internal server error'
        };
    }
}

export async function getType(id: number) {
    const type = await prisma.umkmType.findUnique({
        where: {id}
    });

    if (!type) {
        return {
            error: true,
            status: 404,
            message: 'Type not found'
        }
    }

    return {
        message: 'Type retrieved successfully',
        data: type
    }
}

export async function updateType(id: number, name: string, categoryId: number) {
    const existingType = await prisma.umkmType.findUnique({
        where: {
            name,
            NOT: {id},
        }
    });

    if (existingType) {
        return {
            error: true,
            status: 400,
            message: 'Type already exists'
        }
    }

    console.log('Updating type with id:', id, 'and categoryId:', categoryId);

    const type = await prisma.umkmType.update({
        where: {id},
        data: {
            name,
            category_id: categoryId
        }
    });

    if (!type) {
        return {
            error: true,
            status: 500,
            message: 'Type not updated'
        }
    }

    return {
        message: 'Type updated successfully',
        data: type
    }
}

export async function deleteType(id: number) {
    const existingType = await prisma.umkmType.findUnique({
        where: {id}
    });

    if (!existingType) {
        return {
            error: true,
            status: 404,
            message: 'Type not found'
        }
    }

    const type = await prisma.umkmType.delete({
        where: {id}
    });

    if (!type) {
        return {
            error: true,
            status: 500,
            message: 'Type not deleted'
        }
    }

    return {
        message: 'Type deleted successfully',
        data: type
    }
}

export async function getTypesByCategory(categoryId: number) {

    const existingCategory = await prisma.umkmCategory.findUnique({
        where: {id: categoryId}
    });

    if (!existingCategory) {
        return {
            error: true,
            status: 404,
            message: 'Category not found'
        }
    }

    const types = await prisma.umkmType.findMany({
        where: {category_id: categoryId}
    });

    if (!types) {
        return {
            error: true,
            status: 404,
            message: 'Types not found'
        }
    }

    return {
        message: 'Types retrieved successfully',
        data: types
    }
}