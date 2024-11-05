import express from  'express';
import { test } from '../services/test.js';

const router = express.Router();

router.post('/router', test);

export default router;