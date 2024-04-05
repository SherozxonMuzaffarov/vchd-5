const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const ownerController = require("../controllers/ownerController");
const validations = require("../validators/universalValidator");

router.get('/all', authMiddleware, ownerController.getAll)
router.get('/one/:id', authMiddleware, ownerController.getOne)
router.post('/create', authMiddleware, validations.owner, ownerController.create)
router.patch('/update/:id', authMiddleware, validations.owner, ownerController.update)
router.delete('/delete/:id', authMiddleware, ownerController.delete)

module.exports = router;
 