import { Request, Response } from "express";
import supabase from "../config/supabaseClient.js";

export const getProducts = async (req: Request, res: Response) => {
    const { data, error } = await supabase.from('Products').select()

    if (error) {
        res.status(400).send('No products found')
    }

    res.status(200).json(data)
}