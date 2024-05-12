import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {

    await prisma.user.upsert({
        where: {
            email: 'kevin.adm@alpar.com.br'
        },
        create: {
            name: 'Kevin Cruz',
            email: 'kevin.adm@alpar.com.br',
            password: 'adm123',
            admin: true,
        },
        update: {}
    })

    await prisma.product.upsert({
        where: { id: 1, },
        update: {},
        create: {
            name: 'Tênis',
            description: 'Tênis perfeito para skate',
            price: 70,
            imageUrl: 'https://i.pinimg.com/originals/5f/ce/8f/5fce8f6ecfa7277c7f52cd98f7149565.jpg'
        }
    })
}

main().then(async ()=>{

    await prisma.$disconnect()

}).catch(async (e)=>{

    console.log(e)
    await prisma.$disconnect()
    process.exit()

})