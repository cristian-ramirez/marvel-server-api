import dotenv from 'dotenv';
dotenv.config();

import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';

import express from 'express';

const app = express();
const subpath = express();

const argv = require('minimist')(process.argv.slice(2));
const swagger = require('swagger-node-express').createNew(subpath);

const router = require('./router');

const port = process.env.PORT || 7000;

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/v1', subpath);
app.use('/api', router);

app.use(express.static('dist'));
swagger.setApiInfo({
	title: 'Marvel Express API',
	description: 'API to do something, manage something...',
	termsOfServiceUrl: '',
	contact: 'ramireze4@gmail.com',
	license: '',
	licenseUrl: '',
});

subpath.get('/', (req, res) => {
	res.send(__dirname + '/dist/index.html');
});
swagger.configureSwaggerPaths('', 'api-docs', '');

const applicationUrl = argv.domain !== undefined ? argv.domain : 'localhost';
swagger.configure(applicationUrl, '1.0.0');

app.listen(port, () => {
	console.log(`Server running on port:${port}`);
});
