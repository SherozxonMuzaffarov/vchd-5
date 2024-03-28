const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const vagonController = require("../controllers/vagonController");
const validations = require("../validators/universalValidator");

router.get('/all', authMiddleware, vagonController.getAll)
router.get('/repairing-vagons', authMiddleware, vagonController.getAllRepairingVagons)
router.get('/one/:id', authMiddleware, vagonController.getOne)
router.post('/create', authMiddleware, validations.validate, vagonController.create)
router.delete('/delete/:id', authMiddleware, vagonController.delete)
router.patch('/update/:id', authMiddleware, validations.validate, vagonController.update)
router.patch('/get-to-repair/:id', authMiddleware, vagonController.getToRepair)
router.get('/get-vagon-table/remain', authMiddleware, vagonController.generateRemainVagonTable)
router.get('/get-vagon-table/repaired/dr', authMiddleware, vagonController.generateRepairedVagonTableDr)
router.get('/get-vagon-table/repaired/kr', authMiddleware, vagonController.generateRepairedVagonTableKr)
router.get('/get-vagon-table/repaired/krp', authMiddleware, vagonController.generateRepairedVagonTableKrp)
router.get('/get-vagon-table/repaired/to3', authMiddleware, vagonController.generateRepairedVagonTableTo3)

module.exports = router;
 