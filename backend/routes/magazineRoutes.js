const express = require('express');
const router = express.Router();
const magazineController = require('../controllers/magazineController');

// Route to get all magazines
router.get('/magazines', magazineController.getAllMagazines);

// Route to upload magazine
router.post('/magazines', magazineController.uploadMagazine);

module.exports = router;
