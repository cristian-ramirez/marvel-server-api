require('dotenv').config();

const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const express = require('express');
const app = express();

const router = require('./router');

const port = process.env.PORT || 7000;

// apply middlewares
app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use('/api', router);
app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
	console.log('Server running on port:' + port);
});
