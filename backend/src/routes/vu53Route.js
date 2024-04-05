const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const vu53Controller = require("../controllers/vu53Controller");
const validations = require("../validators/universalValidator");

router.get('/all', authMiddleware, vu53Controller.getAll)
router.get('/one/:id/:status', authMiddleware, vu53Controller.getOne)
router.post('/create', authMiddleware, validations.vu53, vu53Controller.create)
router.post('/expense-create', authMiddleware, validations.vu53Expense, vu53Controller.createExpense)
router.patch('/update/:id', authMiddleware, vu53Controller.update)

module.exports = router;
 