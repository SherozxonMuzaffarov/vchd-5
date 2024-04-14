const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middlewares/authMiddleware");
const triangelController = require("../../controllers/telejka/triangelController");
const validations = require("../../validators/universalValidator");

router.get('/all', authMiddleware, triangelController.getAll)
router.get('/one/:id/:status', authMiddleware, triangelController.getOne)
router.post('/create', authMiddleware, validations.triangel, triangelController.create)
router.patch('/update/:id', authMiddleware,validations.triangel, triangelController.update)

module.exports = router;
 