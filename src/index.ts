import express from  'express';
import 'dotenv/config';

import productsRoute from './routes/products.route.js'

const port = 8000

const app = express()
app.use(express.json());

const URL = '/api';
app.use(URL + '/products', productsRoute);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})