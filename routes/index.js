const url = require('url');
const api = require('./marvelApi');

function path(req, res) {
	const { limit, offset, nameStartsWith } = url.parse(req.url, true).query;
	const { path } = req.params;
	if (nameStartsWith && path === 'characters') {
		api.findNameStartsWith({ res, path, nameStartsWith });
	} else {
		api.callPath({ res, path, limit, offset, nameStartsWith });
	}
}

function find(req, res) {
	const { path, id } = req.params;
	api.callFind({ res, path, id });
}

module.exports = {
	path,
	find,
};
