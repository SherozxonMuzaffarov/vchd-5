const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const vu91Controller = require("../controllers/vu91Controller");
const validations = require("../validators/universalValidator");

router.get('/all', authMiddleware, vu91Controller.getAll)
router.get('/one/:id/:status', authMiddleware, vu91Controller.getOne)
router.post('/create', authMiddleware, validations.vu91, vu91Controller.create)
router.patch('/update/:id', authMiddleware,validations.vu91, vu91Controller.update)

module.exports = router;
 