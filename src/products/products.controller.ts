import { Request, Response } from "express";
import { getProductService, getProductsService } from "./products.service.js";
// import supabase from "../config/supabaseClient.js";

export const getProducts = async (req: Request, res: Response) => {
    const products = await getProductsService();

    if (!products) {
        res.status(400).send('No products found')
    }

    res.status(200).json(products)
}

export const getProduct = async (req: Request, res: Response) => {
    const productId = req.params.id;

    const product = await getProductService({productId});

    if (!product) {
        res.status(400).send('No product found')
    }

    res.status(200).json(product)
}