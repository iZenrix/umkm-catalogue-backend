import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main(){
    await prisma.role.createMany({
        data: [
            {name: 'admin'},
            {name: 'user'},
        ],
        skipDuplicates: true
    });

    await prisma.user.createMany({
        data: [
            {
                name: 'Admin',
                email: 'admin@gmail.com',
                password: 'password',
                role_id: 1
            },
            {
                name: 'User',
                email: 'user@gmail.com',
                password: 'password',
                role_id: 2
            }
        ]
    });

    await prisma.umkmCategory.createMany({
        data: [
            {name: 'Culinary'},
            {name: 'Craft'},
            {name: 'Trade'},
            {name: 'Service'},
            {name: 'Production'},
            {name: 'Agriculture'},
        ],
        skipDuplicates: true
    });

    await prisma.umkmType.createMany({
        data: [
            {name: 'Restaurants', category_id: 1},
            {name: 'Cafe', category_id: 1},
            {name: 'Bakery', category_id: 1},
            {name: 'Art', category_id: 2},
            {name: 'Handicrafts', category_id: 2},
            {name: 'Souvenirs', category_id: 2},
            {name: 'Grocery', category_id: 3},
            {name: 'Fashion', category_id: 3},
            {name: 'Electronics', category_id: 3},
            {name: 'Salon', category_id: 4},
            {name: 'Laundry', category_id: 4},
            {name: 'Repair', category_id: 4},
            {name: 'Food', category_id: 5},
            {name: 'Garment', category_id: 5},
            {name: 'Furniture', category_id: 5},
            {name: 'Vegetable', category_id: 6},
            {name: 'Fruit', category_id: 6},
            {name: 'Fish', category_id: 6},
        ],
        skipDuplicates: true
    });
}

main()
    .catch((e) => console.error(e))
    .finally(async () => {
       await prisma.$disconnect(); 
    });