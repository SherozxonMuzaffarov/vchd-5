const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middlewares/authMiddleware");
const vu92Controller = require("../../controllers/gildirakSexi/vu92Controller");
const validations = require("../../validators/universalValidator");

router.get('/all', authMiddleware, vu92Controller.getAll)
router.get('/one/:id/:status', authMiddleware, vu92Controller.getOne)
router.post('/create', authMiddleware, validations.vu92, vu92Controller.create)
router.patch('/update/:id', authMiddleware,validations.vu92, vu92Controller.update)

module.exports = router;
 