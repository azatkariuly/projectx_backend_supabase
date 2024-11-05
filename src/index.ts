import express from  'express';
import cors from 'cors';
import 'dotenv/config';

import productsRoute from './routes/products.route.js'

const port = 8000

const app = express()
const allowedOrigins = ['*', 'http://localhost:3000'];
const corsConfig = {
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}

app.use(cors(corsConfig));
app.use(express.json());

const URL = '/api';
app.use(URL + '/products', productsRoute);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})