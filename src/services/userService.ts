import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../models';

export async function authenticateUser(email: string, password: string){
    const user = await prisma.user.findUnique({
       where: {email},
       include: {role: true}
    });

    if(!user || !(await bcrypt.compare(password, user.password))){
        throw new Error('Invalid email or password');
    }

    const token = jwt.sign({id: user.id, role: user.role.name}, process.env.JWT_SECRET as string, {
        expiresIn: '1h',
    });

    return {token, role: user.role.name};
}

export async function registerUser(email: string, password: string, roleName: string) {
    const role = await prisma.role.findUnique({
        where: { name: roleName },
      });

      if (!role) {
        throw new Error('Role not found');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

    return prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            roleId: role.id,
        },
    });
}