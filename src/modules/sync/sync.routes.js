const express = require('express');
const router = express.Router();
const controller = require('./sync.controller');

router.get('/:table', controller.getAll);
router.get('/:table/after/:id', controller.getAfter);
router.post('/:table', controller.upsert);

module.exports = router;