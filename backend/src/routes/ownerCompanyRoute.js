const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const OwnerCompanyController = require("../controllers/ownerCompanyController");
const validations = require("../validators/universalValidator");

router.get('/all', authMiddleware, OwnerCompanyController.getAll)
router.get('/one/:id', authMiddleware, OwnerCompanyController.getOne)
router.post('/create', authMiddleware, validations.validate, OwnerCompanyController.create)
router.patch('/update/:id', authMiddleware, validations.validate, OwnerCompanyController.update)
router.delete('/delete/:id', authMiddleware, OwnerCompanyController.delete)

module.exports = router;
 