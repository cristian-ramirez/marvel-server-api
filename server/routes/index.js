import url from 'url';
import api from './marvelApi';

function path(req, res) {
	const { limit, offset, nameStartsWith } = url.parse(req.url, true).query;
	const { path: pathParam } = req.params;

	if (nameStartsWith && pathParam === 'characters') {
		api.findNameStartsWith({ res, path: pathParam, nameStartsWith });
	} else {
		api.callPath({
			res, path: pathParam, limit, offset, nameStartsWith
		});
	}
}

function find(req, res) {
	const { path: pathParam, id } = req.params;
	api.callFind({ res, path: pathParam, id });
}

module.exports = {
	path,
	find
};
