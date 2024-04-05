const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const employeeController = require('../controllers/employeeController');
const validations = require('../validators/universalValidator')

router.get('/all', authMiddleware, employeeController.getAll)
router.get('/one/:id', authMiddleware, employeeController.getOne)
router.post('/create', authMiddleware,validations.employee, employeeController.create)
router.delete('/delete/:id', authMiddleware, employeeController.delete)

module.exports = router;