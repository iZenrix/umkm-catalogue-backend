import prisma from '../models';

export async function getCategories() {
    const categories = await prisma.umkmCategory.findMany();

    if (!categories) {
        return {
            error: true,
            status: 404,
            message: 'Categories not found'
        }
    }

    return {
        message: 'Categories retrieved successfully',
        data: categories
    }
}

export async function createCategory(name: string) {
    const existingCategory = await prisma.umkmCategory.findUnique({
        where: {name}
    });

    if (existingCategory) {
        return {
            error: true,
            status: 400,
            message: 'Category already exists'
        }
    }

    const category = await prisma.umkmCategory.create({
        data: {
            name
        }
    });

    if (!category) {
        return {
            error: true,
            status: 500,
            message: 'Category not created'
        }
    }

    return {
        message: 'Category created successfully',
        data: category
    }
}

export async function getCategory(id: number) {
    const category = await prisma.umkmCategory.findUnique({
        where: {id}
    });

    if (!category) {
        return {
            error: true,
            status: 404,
            message: 'Category not found'
        }
    }

    return {
        message: 'Category retrieved successfully',
        data: category
    }
}

export async function updateCategory(id: number, name: string) {
    const existingCategory = await prisma.umkmCategory.findUnique({
        where: {name}
    });

    if (existingCategory) {
        return {
            error: true,
            status: 400,
            message: 'Category already exists'
        }
    }

    const category = await prisma.umkmCategory.update({
        where: {id},
        data: {name}
    });

    if (!category) {
        return {
            error: true,
            status: 500,
            message: 'Category not updated'
        }
    }

    return {
        message: 'Category updated successfully',
        data: category
    }
}

export async function deleteCategory(id: number) {
    const category = await prisma.umkmCategory.delete({
        where: {id}
    });

    if (!category) {
        return {
            error: true,
            status: 500,
            message: 'Category not deleted'
        }
    }

    return {
        message: 'Category deleted successfully',
        data: category
    }
}