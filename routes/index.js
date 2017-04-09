const url = require('url');
const api = require('./marvelApi');

function path(req, res) {
	const { limit, offset } = url.parse(req.url, true).query;
	const { path } = req.params;
	api.callPath({ res, path, limit, offset });
}

function find(req, res) {
	const { path, id } = req.params;
	api.callFind({ res, path, id });
}

module.exports = {
	path,
	find,
};
