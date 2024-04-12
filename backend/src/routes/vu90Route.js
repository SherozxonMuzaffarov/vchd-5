const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const vu90Controller = require("../controllers/vu90Controller");
const validations = require("../validators/universalValidator");

router.get('/all', authMiddleware, vu90Controller.getAll)
router.get('/one/:id/:status', authMiddleware, vu90Controller.getOne)
router.post('/create', authMiddleware, validations.vu90, vu90Controller.create)
router.patch('/update/:id', authMiddleware,validations.vu90, vu90Controller.update)

module.exports = router;
 