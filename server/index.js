// eslint-disable-next-line import/no-extraneous-dependencies
import 'babel-polyfill';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import dotEnv from 'dotenv';

dotEnv.config();

const app = express();

const router = require('./router');

const port = process.env.PORT || 3000;

app.use(morgan('tiny'));
app.use(cors());

app.use('/api', router);

app.listen(port, () => console.log(`Server running on port:${port}\n`));
