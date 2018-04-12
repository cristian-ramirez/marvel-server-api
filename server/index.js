import express from 'express';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';

import dotEnv from 'dotenv';
dotEnv.config();

const app = express();

const router = require('./router');

const port = process.env.PORT || 7000;

app.use(morgan('tiny'));
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/api', router);

app.listen(port, () => console.log(`Server running on port:${port}\n`) );
