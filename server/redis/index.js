import redis from 'redis';
import { promisify } from 'util';

const redisClient = redis.createClient(process.env.REDIS_URL);
let isConnected;

redisClient.on('connect', () => {
	isConnected = true;
	console.log('\x1b[36m[redis] connect to server\x1b[0m');
});

redisClient.on('error', (err) => {
	isConnected = false;
	console.log(`\x1b[31m[redis] Error ${err}\x1b[0m`);
});

function set(key, value) {
	return redisClient.set(key, value);
}

function get(key) {
	const getAsync = promisify(redisClient.get).bind(redisClient);
	return isConnected && getAsync(key);
}

module.exports = {
	set,
	get
};
