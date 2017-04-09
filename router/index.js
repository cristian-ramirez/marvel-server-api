const express = require('express');
const routes = require('../routes');

const router = express.Router({
	mergeParams: true,
});

const paths = ['characters', 'comics', 'creators', 'events', 'series', 'stories'];

function validatePaths(req, res, next) {
	const { path } = req.params;
	if (paths.indexOf(path) !== -1) {
		next();
	} else {
		res.send(`Paths not found: ${path}`).end();
	}
}

router.get('/:path', validatePaths, routes.path);
router.get('/:path/:id', validatePaths, routes.find);

module.exports = router;
