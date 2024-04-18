const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middlewares/authMiddleware");
const vu93Controller = require("../../controllers/gildirakSexi/vu93Controller");
const validations = require("../../validators/universalValidator");

router.get('/all', authMiddleware, vu93Controller.getAll)
router.get('/one/:id/:status', authMiddleware, vu93Controller.getOne)
router.post('/create', authMiddleware, validations.vu93, vu93Controller.create)
router.patch('/update/:id', authMiddleware,validations.vu93, vu93Controller.update)

module.exports = router;
 