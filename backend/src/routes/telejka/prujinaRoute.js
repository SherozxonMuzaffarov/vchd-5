const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middlewares/authMiddleware");
const prujinaController = require("../../controllers/telejka/prujinaController");
const validations = require("../../validators/universalValidator");

router.get('/all', authMiddleware, prujinaController.getAll)
router.get('/one/:id/:status', authMiddleware, prujinaController.getOne)
router.post('/create', authMiddleware, validations.prujina, prujinaController.create)
router.patch('/update/:id', authMiddleware,validations.prujina, prujinaController.update)

module.exports = router;
 