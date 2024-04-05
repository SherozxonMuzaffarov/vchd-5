const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const naplavkaController = require("../controllers/naplavkaController");
const validations = require("../validators/universalValidator");

router.get('/all', authMiddleware, naplavkaController.getAll)
router.get('/one/:id/:status', authMiddleware, naplavkaController.getOne)
router.post('/create', authMiddleware, validations.naplavka, naplavkaController.create)
router.patch('/update/:id', authMiddleware,validations.naplavka, naplavkaController.update)

module.exports = router;
 