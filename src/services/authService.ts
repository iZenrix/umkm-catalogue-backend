import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../models';

export async function loginUser(email: string, password: string) {
    const user = await prisma.user.findUnique({
        where: {email},
        include: {role: true}
    });

    if (!user) {
        return {error: true, status: 404, message: 'User not found'};
    }

    if (!user.password) {
        return {error: true, status: 404, message: 'Password not set'};
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
        const payload = {
            id: user.id,
            name: user.name,
            email: user.email
        };

        const secret = process.env.JWT_SECRET!;

        const expiresIn = 60 * 60;

        const token = jwt.sign(payload, secret, {expiresIn: expiresIn});

        return {
            message: 'User login successfully',
            data: {
                id: user.id,
                name: user.name,
                email: user.email
            },
            token
        };
    } else {
        return {error: true, status: 403, message: 'Wrong password or email'};
    }
}

export async function registerUser(name: string, email: string, password: string, roleName: string) {
    const role = await prisma.role.findUnique({
        where: {name: roleName},
    });

    if (!role) {
        return {error: true, status: 404, message: 'Role not found'};
    }

    const existingEmail = await prisma.user.findUnique({
        where: {email: email},
    });

    if (existingEmail) {
        return {error: true, status: 409, message: 'Email is already registered'};
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role_id: role.id,
        },
    });

    return {
        message: 'User registered successfully',
        data: {
            name: user.name,
            email: user.email,
            role: role.name
        },
    };
}