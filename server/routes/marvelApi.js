import api from 'marvel-api';
import redisdb from '../redis';

const NOT_IMAGE_AVAILABLE = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available';

const marvel = api.createClient({
	publicKey: process.env.APP_KEY_PUBLIC,
	privateKey: process.env.APP_KEY_PRIVATE
});

function filterNotAvailable({ data }) {
	return data.filter(({ thumbnail }) => (thumbnail.path !== NOT_IMAGE_AVAILABLE && thumbnail.extension !== 'gif'));
}

function asyncFindAll(path, limit, offset) {
	return new Promise((resolve, reject) => {
		marvel[path].findAll(limit, offset)
			.then(resolve)
			.fail(reject)
			.done();
	});
}

function asyncFindNameStartsWith(path, nameStartsWith) {
	return new Promise((resolve, reject) => {
		marvel[path].findNameStartsWith(nameStartsWith)
			.then(resolve)
			.fail(reject)
			.done();
	});
}

function asyncCallFind(path, id) {
	return new Promise((resolve, reject) => {
		marvel[path].find(id)
			.then(resolve)
			.fail(reject)
			.done();
	});
}

async function callFind({ path, id, res }) {
	const key = `marvel:${path}-${id}`;
	let result;

	try {
		result = await redisdb.get(key);

		if (result) {
			res.send(JSON.parse(result));
		} else {
			result = await asyncCallFind(path, id);

			redisdb.set(key, JSON.stringify(result));
			res.send(result);
		}
	} catch (err) {
		res.send(err.message);
	}
}

async function callPath({
	path, res, limit = 20, offset = 0
}) {
	const key = `marvel:${path}-${limit}-${offset}`;
	let result;

	try {
		result = await redisdb.get(key);

		if (result) {
			res.send(JSON.parse(result));
		} else {
			result = await asyncFindAll(path, limit, offset);

			result.data = filterNotAvailable(result);
			redisdb.set(key, JSON.stringify(result));
			res.send(result);
		}
	} catch (err) {
		res.send(err.message);
	}
}

async function findNameStartsWith({ res, path, nameStartsWith }) {
	const key = `marvel:${path}-${nameStartsWith}`;
	let result;

	try {
		result = await redisdb.get(key);

		if (result) {
			res.send(JSON.parse(result));
		} else {
			result = await asyncFindNameStartsWith(path, nameStartsWith);

			result.data = filterNotAvailable(result);
			redisdb.set(key, JSON.stringify(result));
			res.send(result);
		}
	} catch (err) {
		res.send(err.message);
	}
}

module.exports = {
	callFind,
	callPath,
	findNameStartsWith
};
