import * as bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const users = [
        {
            name: 'admin1',
            email: 'admin@company.com',
            role: 'admin',
        },
    ];
    for (const [index, user] of users.entries()) {
        if (
            typeof process.env[user.name.toUpperCase() + '_PASSWORD'] !==
            'string'
        ) {
            throw 'PASSWORDS NOT EXPORTED';
        }
        console.log(
            process.env[user.name.toUpperCase() + '_PASSWORD'] as string,
        );
        const userHashedPass = await bcrypt.hash(
            process.env[user.name.toUpperCase() + '_PASSWORD'] as string,
            10,
        );

        await prisma.user.upsert({
            where: { id: index + 1 },
            update: {},
            create: {
                email: user.email,
                role: user.role,
                password: userHashedPass,
            },
        });
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
