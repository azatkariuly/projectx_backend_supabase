import express from  'express';
import { getProducts } from '../controllers/products.controller.js';

const router = express.Router();

router.post('/all', getProducts);

export default router;