import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';

import dotEnv from 'dotenv';
dotEnv.config();

import express from 'express';

const app = express();
const subPath = express();

const router = require('./router');

const port = process.env.PORT || 7000;

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/v1', subPath);
app.use('/api', router);

app.listen(port, () => {
	console.log(`Server running on port:${port}`);
});
