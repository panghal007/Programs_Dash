const express = require('express');
const router = express.Router();
const programController = require('../controllers/programController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);


router.get('/', authMiddleware, programController.getAllPrograms);
router.post('/', authMiddleware, programController.createProgram);
router.put('/:id', authMiddleware, programController.updateProgram);

router.delete('/:id', authMiddleware, programController.deleteProgram);
// router.post('/createProgram', authMiddleware, programController.createNewProgram);

module.exports = router;