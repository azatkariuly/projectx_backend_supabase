import express from  'express';
import { getProduct, getProducts } from '../controllers/products.controller.js';

const router = express.Router();

router.post('/all', getProducts);
router.post('/:id', getProduct);

export default router;