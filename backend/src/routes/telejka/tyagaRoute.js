const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middlewares/authMiddleware");
const tyagaController = require("../../controllers/telejka/tyagaController");
const validations = require("../../validators/universalValidator");

router.get('/all', authMiddleware, tyagaController.getAll)
router.get('/one/:id/:status', authMiddleware, tyagaController.getOne)
router.post('/create', authMiddleware, validations.tyaga, tyagaController.create)
router.patch('/update/:id', authMiddleware,validations.tyaga, tyagaController.update)

module.exports = router;
 