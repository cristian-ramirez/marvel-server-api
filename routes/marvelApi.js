const api = require('marvel-api');
const NOT_IMAGE_AVAILABLE = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available';

const marvel = api.createClient({
	publicKey: process.env.APP_KEY_PUBLIC,
	privateKey: process.env.APP_KEY_PRIVATE,
});

function callFind({ path, id, res }) {
	marvel[path].find(id)
		.then(response => {
			res.send(response);
		})
		.fail(error => {
			res.send(error).end();
		})
		.done();
}

function callPath({ path, res, limit, offset }) {
	marvel[path].findAll((limit || 20), (offset || 0))
		.then(response => {
				response.data = filterNotAvailable(response);
				res.send(response);
		})
		.fail(error => {
			res.send(error).end();
		})
		.done();
}

function filterNotAvailable({ data }) {
	return data.filter((item) => item.thumbnail.path !== NOT_IMAGE_AVAILABLE);
}

module.exports = {
	callFind,
	callPath,
};
