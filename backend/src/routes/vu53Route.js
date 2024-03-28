const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const vu53Controller = require("../controllers/vu53Controller");
const validations = require("../validators/universalValidator");

router.get('/all', authMiddleware, vu53Controller.getAll)
router.get('/one/:id', authMiddleware, vu53Controller.getOne)
router.post('/create', authMiddleware, validations.validate, vu53Controller.create)
router.delete('/delete/:id', authMiddleware, vu53Controller.delete)
router.patch('/update/:id', authMiddleware, validations.validate, vu53Controller.update)

module.exports = router;
 