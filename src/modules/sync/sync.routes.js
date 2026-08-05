const express = require("express");
const router = express.Router();
const controller = require("./sync.controller");

router.get("/:table", controller.getAll);
router.get("/:table/after/:id", controller.getAfter);
router.get("/:table/deleted", controller.getDeleted); 

router.post("/:table", controller.upsert);


router.delete("/:table/:id", controller.softDelete); // Soft Delete
router.delete("/:table/:id/hard", controller.hardDelete); // Hard Delete

module.exports = router;
