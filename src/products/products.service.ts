import { prisma } from '../prismaClient.js';

export const getProductsService = async () => {
    try {
        const products = await prisma.products.findMany();
        return products;
    } catch (e) {
        console.log('back getProductsService;', e)
        return null;
    }
}

export const getProductService = async ({productId} : {productId: string}) => {
    try {
        const product = await prisma.products.findUnique({
            where: {
                id: productId,
            }
        })
        return product;
    } catch (e) {
        console.log('back getProductService;', e)
        return null;
    }
}