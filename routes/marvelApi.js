const api = require('marvel-api');

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
	marvel[path].findAll((limit || 0), (offset || 0))
		.then(response => {
			res.send(response);
		})
		.fail(error => {
			res.send(error).end();
		})
		.done();
}

module.exports = {
	callFind,
	callPath,
};
