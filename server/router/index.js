import express from 'express';
import routes from '../routes';

const router = express.Router({ mergeParams: true });

const paths = ['characters', 'comics', 'creators', 'events', 'series', 'stories'];

function validatePaths(req, res, next) {
	const { path } = req.params;
	if (paths.indexOf(path) !== -1) {
		next();
	} else {
		res.send(`Paths not found: ${path}`).end();
	}
}

router.use('/:path', validatePaths);

router.get('/:path', routes.path);
router.get('/:path/:id', routes.find);

module.exports = router;
